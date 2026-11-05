import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import ivm from 'isolated-vm';
import nodeFetch from 'node-fetch';
import type { Transaction } from './transaction.js';
import type { Sandbox, SandboxRunResult } from './sandbox.js';

const require = createRequire(import.meta.url);

/**
 * Source of the moment date library, read once and evaluated inside each
 * isolate so that card code sees a real in-isolate `moment`. moment-mini ships
 * a UMD bundle; with no `module`/`exports`/`define` present it falls through to
 * assigning `moment` onto the global object, which is exactly what we want.
 */
let momentSource: string | undefined;
function getMomentSource(): string {
  if (momentSource === undefined) {
    momentSource = readFileSync(require.resolve('moment-mini'), 'utf8');
  }
  return momentSource;
}

/**
 * Bootstrap installed into every context before the card code runs. It wires
 * the host bridges (`_hostLog`, `_hostFetch`) up to the `console` and `fetch`
 * globals the card code expects. moment is loaded separately (its own script)
 * so the two can be compiled once and reused across contexts.
 */
const BOOTSTRAP = `
  globalThis.global = globalThis;
  globalThis.console = {
    log: (...args) => { _hostLog.applySync(undefined, [JSON.stringify(args ?? [])]); },
  };
  globalThis.fetch = async (url, opts) => {
    const json = await _hostFetch.apply(
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
`;

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
 * between the before- and after-transaction phases.
 */
export class IsolatedVmSandbox implements Sandbox {
  private readonly isolate: ivm.Isolate;
  private readonly momentScript: ivm.Script;
  private readonly bootstrapScript: ivm.Script;

  constructor(options: { memoryLimit?: number } = {}) {
    this.isolate = new ivm.Isolate({ memoryLimit: options.memoryLimit ?? 128 });
    // Scripts are compiled once per isolate and can run in any of its contexts.
    this.momentScript = this.isolate.compileScriptSync(getMomentSource());
    this.bootstrapScript = this.isolate.compileScriptSync(BOOTSTRAP);
  }

  async run(
    script: string,
    env: Record<string, unknown>,
    authInput: Transaction,
  ): Promise<SandboxRunResult> {
    const logs: unknown[][] = [];
    const context = await this.isolate.createContext();
    try {
      const jail = context.global;

      // Host bridges. Arguments and results cross the isolate boundary as
      // JSON strings so only plain, copyable data is ever transferred.
      await jail.set(
        '_hostLog',
        new ivm.Reference((json: string) => {
          try {
            logs.push(JSON.parse(json) as unknown[]);
          } catch {
            logs.push([json]);
          }
        }),
      );
      await jail.set(
        '_hostFetch',
        new ivm.Reference(async (url: string, optsJson?: string) => {
          const res = await nodeFetch(
            url,
            optsJson === undefined ? undefined : JSON.parse(optsJson),
          );
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

      // Copyable globals.
      await jail.set('process', new ivm.ExternalCopy({ env }).copyInto());
      await jail.set('authInput', new ivm.ExternalCopy(authInput).copyInto());

      // Install moment and the console/fetch bridges.
      await this.momentScript.run(context);
      await this.bootstrapScript.run(context);

      // Run the card code. `promise: true` awaits the async IIFE; `copy: true`
      // brings the resolved value back across the boundary as plain data.
      const userScript = await this.isolate.compileScript(script);
      const value = await userScript.run(context, {
        promise: true,
        copy: true,
      });
      return { value, logs };
    } catch (e: unknown) {
      return { value: undefined, logs, error: String(e) };
    } finally {
      context.release();
    }
  }

  dispose(): void {
    if (!this.isolate.isDisposed) {
      this.isolate.dispose();
    }
  }
}
