import type { Transaction } from './transaction.js';

/**
 * The result of running a single script inside a sandbox.
 *
 * `logs` holds the arguments of each `console.log` call, in order, so the
 * caller can shape them into execution-item log entries. `error`, when set,
 * is the string form of whatever the script threw (e.g.
 * `"ReferenceError: foo is not defined"`).
 */
export interface SandboxRunResult {
  value: unknown;
  logs: unknown[][];
  error?: string;
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
 *   - `console`    with `log` captured into {@link SandboxRunResult.logs}
 *   - `fetch`      a fetch implementation
 *   - `moment`     the moment date library
 */
export interface Sandbox {
  /**
   * Run `script` with the given environment variables and transaction.
   *
   * Script-level errors (thrown by the card code) are reported via
   * {@link SandboxRunResult.error} rather than rejecting the promise, so that
   * any logs emitted before the error are still returned. The promise rejects
   * only on sandbox infrastructure failures.
   */
  run(
    script: string,
    env: Record<string, unknown>,
    authInput: Transaction,
  ): Promise<SandboxRunResult>;

  /** Release any resources held by the sandbox. */
  dispose(): void;
}
