import { build } from 'esbuild';
import { sharedOptions } from './esbuild.shared.js';

// Bundles used by the standalone tests. Run it after `npm run build`: the test
// app imports the built `dist/standalone.js`.
await build({
  ...sharedOptions,
  entryPoints: {
    'create-parser': 'src/slang-utils/create-parser.ts',
    'variant-coverage': 'variant-coverage/index.ts'
  }
});

// The test app re-bundles `dist/standalone.js` like a user's project would, so
// it gets its own outdir: its .wasm files must be carried over, not found in
// `dist` by accident.
await build({
  ...sharedOptions,
  entryPoints: { test: 'tests/integration/test-app/test-app.js' },
  outdir: 'dist-test'
});
