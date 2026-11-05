---
'programmable-card-code-emulator': major
---

Run card code in an isolated-vm sandbox instead of Node's `vm` module.

Breaking changes:

- Node.js 22 or newer is required (`engines.node` is now `>=22`), and isolated-vm is a native dependency. Prebuilt binaries cover Node 22 and 24 on macOS (Apple silicon), Linux x64/arm64 and Windows x64; elsewhere it compiles on install.
- `authorizationApproved` on the `before_transaction` execution item is now `true` or `false`, matching the branch taken, instead of always `null`.
- Card code has a 5 second timeout per phase by default.

Other changes:

- Card code runs in its own V8 isolate with no access to the host process.
- New `IsolatedVmSandbox` export with `timeoutMs`, `memoryLimit` and `maxResponseBytes` options. Pass one as the fourth argument to `run` to reuse it across runs. It supports `Symbol.dispose`.
- `console.warn` and `console.error` are captured at their own levels, and every `console` argument is kept (single-argument output is unchanged).
- In-flight `fetch` requests are aborted when a phase times out or runs out of memory, and response bodies are capped at 10 MiB by default.
- Clearer error when the environment variables aren't valid JSON.
