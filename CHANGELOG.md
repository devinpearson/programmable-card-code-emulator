# programmable-card-code-emulator

## 3.0.1

### Patch Changes

- 1dec498: Document the release process in the README. This is the first version published by the release workflow since 3.0.0, so it carries an npm provenance attestation.

## 3.0.0

### Major Changes

- 715a2da: Run card code in an isolated-vm sandbox instead of Node's `vm` module.

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

## 2.0.1

### Patch Changes

- Override esbuild to resolve audit vulnerability
- Update GitHub Actions to Node 24 and add npm publish workflow

## 1.4.1

### Patch Changes

- f1554a6: Updated code style

## 1.4.0

### Minor Changes

- 6e873b0: Refactoring the build tools
