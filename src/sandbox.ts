import type { Transaction } from './transaction.js';

/**
 * A structured form of whatever the card code threw. `name`/`message` mirror a
 * JS error (e.g. `"ReferenceError"` / `"foo is not defined"`); `stack` is
 * included when the engine provides one.
 */
export interface SandboxError {
  name: string;
  message: string;
  stack?: string;
}

/**
 * The result of running a single script inside a sandbox.
 *
 * `logs`, `warns` and `errors` hold the captured `console.log`/`console.warn`/
 * `console.error` output, split by level, so the caller can shape them into
 * execution-item log entries. `logs` and `warns` keep the raw call arguments
 * (each entry is the argument list of one call); `errors` holds ready-to-use
 * content strings, with the thrown error (if any) appended last. `error`, when
 * set, is the structured form of that thrown error.
 */
export interface SandboxRunResult {
  value: unknown;
  logs: unknown[][];
  warns: unknown[][];
  errors: string[];
  error?: SandboxError;
}

/**
 * A sandbox runs untrusted card code and reports back what it logged, what it
 * returned, and whether it threw.
 *
 * This interface is the seam between the emulator and whatever actually
 * executes the code. The public API (`run` in `exec.ts`) depends only on this,
 * so the underlying engine can be swapped with no change to callers.
 *
 * The code passed to {@link Sandbox.run} is given these globals:
 *   - `authInput`  the transaction under test
 *   - `process`    `{ env }` from the supplied environment variables
 *   - `console`    with `log`/`info`/`debug`/`warn`/`error` captured
 *   - `fetch`      a fetch implementation
 *   - `moment`     the moment date library
 */
export interface Sandbox {
  /**
   * Run `script` with the given environment variables and transaction.
   *
   * Script-level errors (thrown by the card code, including hitting an
   * execution timeout) are reported via {@link SandboxRunResult.error} and
   * appended to {@link SandboxRunResult.errors}, rather than rejecting the
   * promise, so that any output emitted before the error is still returned.
   * The promise rejects only on sandbox infrastructure failures.
   */
  run(
    script: string,
    env: Record<string, unknown>,
    authInput: Transaction,
  ): Promise<SandboxRunResult>;

  /** Release any resources held by the sandbox. */
  dispose(): void;
}
