import { rm } from 'node:fs/promises';
import { parseArgs } from 'node:util';
import { build } from 'esbuild';
import { wasmUrlPlugin } from './esbuild-wasm-url.js';

const outdir = 'dist';

// This is the production and development configuration, picked with
// `--env production` or `--env development`.
const { values } = parseArgs({ options: { env: { type: 'string' } } });
const isProduction = values.env === 'production';

// clean outdir
await rm(outdir, { recursive: true, force: true });

await build({
  entryPoints: { standalone: 'src/browser.ts' },
  bundle: true,
  format: 'esm',
  platform: 'browser',
  target: 'es2023',
  // Slang only imports this in Node, where it reads its .wasm files from disk.
  external: ['node:fs/promises'],
  loader: { '.wasm': 'file' },
  plugins: [wasmUrlPlugin],
  minify: isProduction,
  sourcemap: true,
  outdir,
  logLevel: 'warning'
});
