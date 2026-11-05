# Programmable Card Code Emulator

Write and test programmable card code in a safe environment.

[![Node.js CI](https://github.com/devinpearson/programmable-card-code-emulator/actions/workflows/node.js.yml/badge.svg)](https://github.com/devinpearson/programmable-card-code-emulator/actions/workflows/node.js.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/programmable-card-code-emulator.svg)](https://badge.fury.io/js/programmable-card-code-emulator)

## About

While exploring Programmable Banking Cards, I found it difficult to test my code. I wanted to be able to write code and test it in a safe environment. I also wanted to be able to share my code with others. This project is an attempt to solve these problems.

## Requirements

- Node.js 22 or newer.
- The emulator runs card code with [isolated-vm](https://github.com/laverdet/isolated-vm), a native addon. Prebuilt binaries ship for Node 22 and 24 on macOS (Apple silicon), Linux x64 and arm64 (glibc and musl), and Windows x64. On other platforms or Node versions (an Intel Mac, or Node 25, for example) `npm install` compiles it, which needs Python, `make` and a C++ compiler.

## Installation

```bash
npm i programmable-card-code-emulator
```

## Usage

```typescript
import { createTransaction, run } from 'programmable-card-code-emulator';

const code = `
  const beforeTransaction = async (authorization) => {
    console.log(authorization.merchant.name);
    return authorization.centsAmount < 50000; // approve under R500
  };

  const afterTransaction = async (transaction) => {
    console.log('approved');
  };

  const afterDecline = async (transaction) => {
    console.log('declined');
  };
`;

const transaction = createTransaction(
  'ZAR', // currency code
  1000, // amount in cents
  '0000', // merchant category code (MCC)
  'Test Merchant', // merchant name
  'Test City', // merchant city
  'ZAF', // country code
);

const environmentVariables = JSON.stringify({ apiKey: 'test-key' });

const executions = await run(transaction, code, environmentVariables);
```

### What `run` returns

An array of two execution items, shaped like the live logs:

1. `before_transaction`. `authorizationApproved` is `true` or `false`. Returning `false` from `beforeTransaction` declines; anything else approves. An error or timeout in `beforeTransaction` counts as a decline.
2. `after_transaction` if approved, otherwise `after_decline`. `authorizationApproved` is `null`.

Each item's `logs` holds `{ createdAt, level, content }` entries, with `level` set to `info`, `warn` or `error`:

- `content` is each `console` argument JSON-encoded, joined by spaces. `console.log('a', { b: 1 })` gives `"a" {"b":1}`.
- An error thrown by the card code is logged at `error` level as plain text, for example `ReferenceError: foo is not defined`.

Errors in card code never make `run` reject. It does reject if `environmentVariables` isn't valid JSON.

### What card code can use

| Global | |
| --- | --- |
| `authInput` | The transaction under test (also passed to each handler). |
| `process.env` | The parsed `environmentVariables`. |
| `console` | `log`, `info` and `debug` (logged as `info`), `warn`, `error`. |
| `fetch` | Resolves to `{ status, statusText, ok, headers, json(), text() }`. `headers` is a plain object, and bodies are read as text. |
| `moment` | The [moment](https://momentjs.com/) date library. |

Card code runs in its own V8 isolate. It has no `require`, no access to the host's `process`, and no handle on any object in your application. Each phase gets a fresh context, so nothing carries over from `beforeTransaction` to the after-phase.

> **`fetch` is not restricted.** Card code can reach `localhost` and private network addresses, so you can test callbacks against local servers. Only run card code you trust on a machine whose network you'd be comfortable exposing to it.

### Sandbox options and reuse

By default `run` creates a sandbox for each call and disposes it afterwards. To change limits, or to save the setup cost across many runs, create one yourself and pass it as the fourth argument:

```typescript
import { IsolatedVmSandbox, run } from 'programmable-card-code-emulator';

using sandbox = new IsolatedVmSandbox({
  timeoutMs: 5000, // per phase; 0 disables
  memoryLimit: 128, // MB
  maxResponseBytes: 10 * 1024 * 1024, // largest fetch body; 0 disables
});

for (const transaction of transactions) {
  const executions = await run(transaction, code, '{}', sandbox);
}
```

- **`timeoutMs`** (default 5000). Busy loops are stopped by V8. Code that waits forever, such as a never-settling promise or a server that never answers, is stopped by a wall-clock check just after. Either way the phase logs a `timed out` error and any `fetch` still in flight is aborted.
- **`memoryLimit`** (default 128 MB). Going over it logs an error, and the next run starts a fresh isolate.
- **`maxResponseBytes`** (default 10 MiB). Responses are read outside the isolate's memory limit, so this caps them; a larger response makes `fetch` reject.

A sandbox you create is yours to dispose: call `sandbox.dispose()`, or declare it with `using` as above (TypeScript 5.2 or newer). The engine sits behind the `Sandbox` interface, so you can supply your own implementation of it.

## Upgrading from 2.x

- Node.js 22 or newer is required, and isolated-vm is a native dependency.
- `authorizationApproved` on the `before_transaction` item is now `true`/`false` instead of always `null`.
- Logs keep every `console` argument, not just the first. Single-argument output is unchanged.
- `console.warn` and `console.error` are captured at their own levels.
- Card code now has a 5 second timeout per phase by default.

## Development

```bash
npm install
npm test               # vitest
npm run typecheck      # tsc
npm run lint           # biome check (lint:fix to apply safe fixes)
npm run format         # biome format
npm run ci             # build, typecheck, lint, check-exports
npm run test:mutation  # Stryker; report at reports/mutation/mutation.html
```

## Releasing

Versions and the changelog are managed with [changesets](https://github.com/changesets/changesets). npm publishing is done by the **Publish to npm** workflow (`.github/workflows/publish.yml`), which uses npm trusted publishing, so each version it publishes carries a provenance attestation.

### 1. Add a changeset with each user-facing change

In the PR that makes the change:

```bash
npx changeset
```

Pick the bump and write a one-paragraph summary, then commit the new file in `.changeset/`. Use **major** for anything that can break existing users, such as raising the minimum Node version, adding a native dependency, or changing what `run` returns.

### 2. Version on a release branch

Start from an up-to-date `main`:

```bash
git checkout main && git pull
git checkout -b release-X.Y.Z
npx changeset version
git push -u origin release-X.Y.Z
```

`changeset version` bumps `package.json`, writes the `CHANGELOG.md` entry, deletes the consumed changesets, and commits all of that itself. That's the `commit` setting in `.changeset/config.json`, which is set not to add `[skip ci]` (see below). Open a PR to `main`, let CI run, check the version and changelog, and merge it.

### 3. Create a GitHub Release on the release commit

Creating the Release creates the `vX.Y.Z` tag, and the new tag starts the **Publish to npm** workflow: `npm ci`, `npm test`, then `npm publish` (whose `prepublishOnly` runs `npm run ci`).

In the GitHub UI: Releases → Draft a new release → create tag `vX.Y.Z` on `main` → paste the version's `CHANGELOG.md` entry as the notes → Publish release.

Or from the terminal, right after the release PR merges:

```bash
git checkout main && git pull
gh release create vX.Y.Z --target "$(git rev-parse HEAD)" --title vX.Y.Z \
  --notes "$(awk '/^## X.Y.Z/{f=1;next} /^## /{if(f)exit} f' CHANGELOG.md)"
```

If no publish run appears within a minute or two, start it by hand on the tag:

```bash
gh workflow run publish.yml --ref vX.Y.Z
```

Or use Actions → Publish to npm → Run workflow, and pick the tag.

### 4. Check it went out

```bash
gh run list --workflow publish.yml --limit 1
npm view programmable-card-code-emulator version
npm view programmable-card-code-emulator@X.Y.Z dist.attestations.provenance
```

A new version can take a few minutes to appear on npm after it's accepted.

### Publishing from your machine

`npm run local-release` runs `changeset version` and then `changeset publish`, which publishes with a browser login. Prefer the workflow, because a local publish:

- has no provenance attestation;
- versions and tags whatever branch you're on, so for 3.0.0 the version commit landed on a release branch and needed a follow-up PR to reach `main`;
- leaves the tag on your machine only.

### Things that have gone wrong before

- **`[skip ci]` in the version commit.** By default, changesets ends its version commit message with `[skip ci]`. A squash merge carries that line into `main`, and GitHub then skips push and pull-request workflows for that commit, including the tag a Release creates. So the 3.0.0 and 3.0.1 release PRs got no CI, and their tags didn't start the publish workflow; 3.0.1 was published by starting the workflow by hand. `.changeset/config.json` now sets `"skipCI": false`. If a release commit still contains `[skip ci]`, publish with `gh workflow run publish.yml --ref vX.Y.Z`, which `[skip ci]` doesn't block.
- **Stacked PRs and squash merges.** Don't base a release branch, or any PR, on another PR's unmerged branch. Once the first PR is squash-merged, GitHub merges the second against an older base and can silently drop file deletions. For 3.0.0 this brought the consumed changeset back onto `main`, which had to be removed separately (#15). Rebase onto `main` after the first PR merges.
- **A version can only be published once.** If the workflow runs for a version that's already on npm, it fails at `npm publish` and changes nothing.
- **Trusted publishing is tied to the workflow file.** It's configured on npmjs.com for this repository and `publish.yml`. Renaming or moving that file breaks publishing until the npm settings are updated.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
