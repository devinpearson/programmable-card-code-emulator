---
'programmable-card-code-emulator': patch
---

Drop the `uuid` and `node-fetch` dependencies in favour of Node's built-in `crypto.randomUUID()` and `fetch`, so installing the emulator pulls in two fewer packages. Card code's `fetch` behaves as before: the same response shape, the `maxResponseBytes` cap (now also enforced on streamed responses with no `Content-Length`), and aborting in-flight requests when a phase times out.
