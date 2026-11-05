/**
 * Turn the argument list of one console call into the `content` string of an
 * execution-item log entry.
 *
 * Each argument is JSON-encoded and the results are joined with a space, so a
 * single-argument call produces exactly `JSON.stringify(arg)` and
 * `console.log('a', 'b', 3)` produces `"a" "b" 3`. Values JSON cannot encode
 * (e.g. `undefined`) fall back to their `String()` form.
 */
export function formatLogArgs(args: readonly unknown[]): string {
  return args
    .map((arg) => {
      const encoded = JSON.stringify(arg);
      return encoded === undefined ? String(arg) : encoded;
    })
    .join(' ');
}
