import { build } from 'esbuild';
import { sharedOptions } from './esbuild.shared.js';

// Bundles used by the standalone tests. Run it after `npm run build`: the test
// app imports the built `dist/standalone.js`.
await build({
  ...sharedOptions,
  entryPoints: {
    test: 'tests/integration/test-app/test-app.js',
    'create-parser': 'src/slang-utils/create-parser.ts',
    'variant-coverage': 'variant-coverage/index.ts'
  }
});
