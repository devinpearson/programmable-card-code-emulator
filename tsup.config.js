import { defineConfig } from 'tsup';

export default defineConfig({
  entryPoints: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  outDir: 'dist',
  clean: true,
  // Provide `import.meta.url` in the CJS output (and __dirname/__filename in
  // ESM) so `createRequire(import.meta.url)` in the isolated-vm sandbox
  // resolves moment's source in both module formats.
  shims: true,
});
