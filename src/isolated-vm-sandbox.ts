import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import ivm from 'isolated-vm';
import nodeFetch, { type RequestInit } from 'node-fetch';
import { formatLogArgs } from './format.js';
import type { Sandbox, SandboxError, SandboxRunResult } from './sandbox.js';
import type { Transaction } from './transaction.js';

const require = createRequire(import.meta.url);

/**
 * A V8 startup snapshot with the moment date library already evaluated into the
 * global, built once and shared by every isolate. Creating a context from the
 * snapshot is markedly cheaper than re-running moment's ~58 KB bundle for each
 * context, and every context created from the isolate inherits `moment`.
 *
 * moment-mini ships a UMD bundle; with no `module`/`exports`/`define` present
 * it falls through to assigning `moment` onto the global object.
 */
let momentSnapshot: ivm.ExternalCopy<ArrayBuffer> | undefined;
function getMomentSnapshot(): ivm.ExternalCopy<ArrayBuffer> {
  if (momentSnapshot === undefined) {
    const source = readFileSync(require.resolve('moment-mini'), 'utf8');
    momentSnapshot = ivm.Isolate.createSnapshot([{ code: source }]);
  }
  return momentSnapshot;
}

/**
 * Bootstrap run in every context before the card code. It captures the per-run
 * host bridges (`_hostLog`, `_hostFetch`) into closures, removes them from the
 * global so card code cannot see or call them directly, and installs the
 * `console` and `fetch` globals that card code expects. moment is already
 * present via the snapshot.
 */
const BOOTSTRAP = `
  (() => {
    const hostLog = _hostLog;
    const hostFetch = _hostFetch;
    delete globalThis._hostLog;
    delete globalThis._hostFetch;

    // Serialize console arguments defensively: BigInt is coerced to a string
    // and circular structures fall back to their String() form, so a log call
    // can never itself throw.
    const serialize = (args) => {
      try {
        return JSON.stringify(args, (_k, v) =>
          typeof v === 'bigint' ? v.toString() : v,
        );
      } catch (_e) {
        try {
          return JSON.stringify(args.map((a) => String(a)));
        } catch (_e2) {
          return '[]';
        }
      }
    };
    const send = (level, args) =>
      hostLog.applySync(undefined, [level, serialize(args)]);

    globalThis.global = globalThis;
    globalThis.console = {
      log: (...args) => send('info', args),
      info: (...args) => send('info', args),
      debug: (...args) => send('info', args),
      warn: (...args) => send('warn', args),
      error: (...args) => send('error', args),
    };

    // NOTE: fetch is intentionally unrestricted (localhost and private hosts
    // are reachable) so that local callbacks can be exercised during
    // development. The response is surfaced as text; binary bodies and
    // duplicate headers (e.g. set-cookie) are not preserved.
    globalThis.fetch = async (url, opts) => {
      const json = await hostFetch.apply(
        undefined,
        [String(url), opts === undefined ? undefined : JSON.stringify(opts)],
        { result: { promise: true, copy: true } },
      );
      const r = JSON.parse(json);
      return {
        status: r.status,
        statusText: r.statusText,
        ok: r.ok,
        headers: r.headers,
        json: async () => JSON.parse(r.body),
        text: async () => r.body,
      };
    };
  })();
`;

export interface IsolatedVmSandboxOptions {
  /** Isolate heap limit in MB. Default 128. */
  memoryLimit?: number;
  /**
   * Maximum time a single script may run, in milliseconds. Default 5000.
   * Pass 0 (or a negative value) to disable the timeout entirely.
   *
   * CPU-bound code (e.g. `while (true) {}`) is terminated by V8 and the sandbox
   * stays usable. Code that hangs without using CPU (e.g. awaiting a promise
   * that never settles, or an unresponsive `fetch`) is caught by a wall-clock
   * guard shortly after; that case disposes the isolate, and the next `run`
   * transparently rebuilds one. Any `fetch` still in flight when a run times
   * out (or the isolate runs out of memory) is aborted.
   */
  timeoutMs?: number;
  /**
   * Largest `fetch` response body the host will read, in bytes. Default
   * 10 MiB. Pass 0 to disable the cap. Response bodies are read on the host,
   * outside the isolate's `memoryLimit`, so this is what bounds them. A larger
   * response makes the card code's `fetch` reject.
   */
  maxResponseBytes?: number;
}

const DEFAULT_MAX_RESPONSE_BYTES = 10 * 1024 * 1024;

/**
 * A {@link Sandbox} backed by [isolated-vm](https://github.com/laverdet/isolated-vm).
 *
 * Unlike Node's built-in `vm` module, each isolate is a genuine V8 isolate with
 * its own heap and no reference to the host's objects or globals, so card code
 * cannot reach back into the emulator process. Values only cross the boundary
 * by copy, which is why `console`, `fetch` and `moment` are bridged rather than
 * passed in directly.
 *
 * Every {@link run} executes in a fresh context so that state never leaks
 * between the before- and after-transaction phases. A single sandbox can be
 * reused across many runs (and is cheaper to reuse than to recreate); it is
 * safe to call {@link dispose} more than once, and the instance also implements
 * `Symbol.dispose` for `using` declarations.
 */
export class IsolatedVmSandbox implements Sandbox {
  private readonly memoryLimit: number;
  private readonly timeoutMs: number;
  private readonly maxResponseBytes: number;
  private isolate: ivm.Isolate | undefined;
  private bootstrapScript: ivm.Script | undefined;

  constructor(options: IsolatedVmSandboxOptions = {}) {
    this.memoryLimit = options.memoryLimit ?? 128;
    this.timeoutMs = options.timeoutMs ?? 5000;
    this.maxResponseBytes = Math.max(
      0,
      options.maxResponseBytes ?? DEFAULT_MAX_RESPONSE_BYTES,
    );
    this.ensureIsolate();
  }

  /** (Re)create the isolate and its compiled bootstrap if needed. */
  private ensureIsolate(): { isolate: ivm.Isolate; bootstrap: ivm.Script } {
    if (
      this.isolate === undefined ||
      this.isolate.isDisposed ||
      this.bootstrapScript === undefined
    ) {
      this.isolate = new ivm.Isolate({
        memoryLimit: this.memoryLimit,
        snapshot: getMomentSnapshot(),
      });
      // Compiled once per isolate; runnable in any of its contexts.
      this.bootstrapScript = this.isolate.compileScriptSync(BOOTSTRAP);
    }
    return { isolate: this.isolate, bootstrap: this.bootstrapScript };
  }

  async run(
    script: string,
    env: Record<string, unknown>,
    authInput: Transaction,
  ): Promise<SandboxRunResult> {
    const { isolate, bootstrap } = this.ensureIsolate();
    const logs: unknown[][] = [];
    const warns: unknown[][] = [];
    const errors: string[] = [];

    const context = await isolate.createContext();
    let timer: ReturnType<typeof setTimeout> | undefined;
    let wallClockTimedOut = false;
    // Aborts this run's in-flight fetches if the run is cut short. A run that
    // finishes normally leaves them alone, so un-awaited callbacks still go
    // out.
    const fetchAbort = new AbortController();
    let abortFetches = false;
    try {
      const jail = context.global;

      // Host bridges. Arguments and results cross the isolate boundary as
      // JSON strings so only plain, copyable data is ever transferred.
      await jail.set(
        '_hostLog',
        new ivm.Reference((level: string, json: string) => {
          let args: unknown[];
          try {
            args = JSON.parse(json) as unknown[];
          } catch {
            args = [json];
          }
          if (level === 'warn') {
            warns.push(args);
          } else if (level === 'error') {
            errors.push(formatLogArgs(args));
          } else {
            logs.push(args);
          }
        }),
      );
      await jail.set(
        '_hostFetch',
        new ivm.Reference(async (url: string, optsJson?: string) => {
          const userOpts: RequestInit =
            optsJson === undefined ? {} : (JSON.parse(optsJson) ?? {});
          const res = await nodeFetch(url, {
            ...userOpts,
            // Applied after the card code's options so it cannot override
            // them. node-fetch rejects once the body exceeds `size`.
            size: this.maxResponseBytes,
            signal: fetchAbort.signal as RequestInit['signal'],
          });
          const body = await res.text();
          const headers: Record<string, string> = {};
          res.headers.forEach((value, key) => {
            headers[key] = value;
          });
          return new ivm.ExternalCopy(
            JSON.stringify({
              status: res.status,
              statusText: res.statusText,
              ok: res.ok,
              headers,
              body,
            }),
          ).copyInto();
        }),
      );

      // Wire console/fetch, then expose the copyable globals.
      await bootstrap.run(context);
      await jail.set('process', new ivm.ExternalCopy({ env }).copyInto());
      await jail.set('authInput', new ivm.ExternalCopy(authInput).copyInto());

      // Run the card code. `promise: true` awaits the async IIFE; `copy: true`
      // brings the resolved value back across the boundary as plain data. The
      // CPU timeout terminates runaway synchronous code without killing the
      // isolate.
      const userScript = await isolate.compileScript(script);
      const runPromise = userScript.run(context, {
        promise: true,
        copy: true,
        ...(this.timeoutMs > 0 ? { timeout: this.timeoutMs } : {}),
      });
      // If the wall-clock guard wins the race below, this promise is abandoned
      // and will later reject against a disposed isolate; swallow that so it
      // does not surface as an unhandled rejection.
      runPromise.catch(() => {});

      let value: unknown;
      if (this.timeoutMs > 0) {
        // Wall-clock guard for hangs that use no CPU (so the isolate's own
        // timeout never fires), set slightly later so the CPU timeout wins for
        // busy loops. If this fires, the isolate is abandoned (see finally).
        const guard = new Promise<never>((_resolve, reject) => {
          timer = setTimeout(() => {
            wallClockTimedOut = true;
            reject(
              new Error(`Script execution timed out after ${this.timeoutMs}ms`),
            );
          }, this.timeoutMs + 50);
        });
        value = await Promise.race([runPromise, guard]);
      } else {
        value = await runPromise;
      }

      return { value, logs, warns, errors };
    } catch (e: unknown) {
      const error = toSandboxError(e);
      // Cut short by a timeout (CPU or wall-clock) or by running out of
      // memory: nothing will consume this run's pending fetches.
      abortFetches =
        wallClockTimedOut ||
        isolate.isDisposed ||
        error.message.startsWith('Script execution timed out');
      errors.push(
        error.name ? `${error.name}: ${error.message}` : error.message,
      );
      return { value: undefined, logs, warns, errors, error };
    } finally {
      if (timer !== undefined) {
        clearTimeout(timer);
      }
      if (abortFetches) {
        fetchAbort.abort();
      }
      context.release();
      // A wall-clock timeout means something is still pending inside the
      // isolate (a never-settling promise, an unresponsive fetch). Dispose it
      // so it cannot keep running; ensureIsolate rebuilds on the next run.
      if (wallClockTimedOut && this.isolate && !this.isolate.isDisposed) {
        this.isolate.dispose();
        this.isolate = undefined;
        this.bootstrapScript = undefined;
      }
    }
  }

  dispose(): void {
    if (this.isolate && !this.isolate.isDisposed) {
      this.isolate.dispose();
    }
    this.isolate = undefined;
    this.bootstrapScript = undefined;
  }

  [Symbol.dispose](): void {
    this.dispose();
  }
}

function toSandboxError(e: unknown): SandboxError {
  if (e instanceof Error) {
    return { name: e.name, message: e.message, stack: e.stack };
  }
  return { name: 'Error', message: String(e) };
}
