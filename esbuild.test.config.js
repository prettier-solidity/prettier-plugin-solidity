import { build } from 'esbuild';
import { wasmUrlPlugin } from './esbuild-wasm-url.js';

// Bundles used by the standalone tests. Run it after `npm run build`: the test
// app imports the built `dist/standalone.js`.
await build({
  entryPoints: {
    test: 'tests/integration/test-app/test-app.js',
    'create-parser': 'src/slang-utils/create-parser.ts',
    'variant-coverage': 'variant-coverage/index.ts'
  },
  bundle: true,
  format: 'esm',
  platform: 'browser',
  target: 'es2023',
  external: ['node:fs/promises'],
  loader: { '.wasm': 'file' },
  plugins: [wasmUrlPlugin],
  outdir: 'dist',
  logLevel: 'warning'
});
