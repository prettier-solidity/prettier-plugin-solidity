import { rm } from 'node:fs/promises';
import { build } from 'esbuild';
import { sharedOptions } from './esbuild.shared.js';

const outdir = 'dist-test';

const entryPoints = {
  test: 'tests/integration/test-app/test-app.js',
  'infer-and-parse': 'src/slang-utils/infer-and-parse.ts',
  'variant-coverage': 'variant-coverage/index.ts'
};

// clean outdir
await rm(outdir, { recursive: true, force: true });

// Bundles used by the standalone tests. Run it after `npm run build`: the test
// app imports the built `dist/standalone.js`.
// One build per entry so each bundle gets its own folder with its own assets.
await Promise.all(
  Object.entries(entryPoints).map(([name, entry]) =>
    build({
      ...sharedOptions,
      entryPoints: { index: entry },
      outdir: `${outdir}/${name}`
    })
  )
);
