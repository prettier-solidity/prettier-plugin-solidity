import { rm } from 'node:fs/promises';
import { parseArgs } from 'node:util';
import { build } from 'esbuild';
import { outdir, sharedOptions } from './esbuild.shared.js';

// This is the production and development configuration, picked with
// `--env production` or `--env development`.
const { values } = parseArgs({ options: { env: { type: 'string' } } });
const isProduction = values.env === 'production';

// clean outdir
await rm(outdir, { recursive: true, force: true });

await build({
  ...sharedOptions,
  entryPoints: { standalone: 'src/browser.ts' },
  minify: isProduction,
  sourcemap: true
});
