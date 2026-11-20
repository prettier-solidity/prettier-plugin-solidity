import path from 'node:path';

const __dirname = import.meta.dirname;

const entries = {
  test: './tests/integration/test-app/test-app.js',
  'infer-and-parse': './src/slang-utils/infer-and-parse.ts',
  'variant-coverage': './variant-coverage/index.ts'
};

// One config per entry so each bundle gets its own folder with its own assets.
export default Object.entries(entries).map(([name, entry]) => ({
  name,
  entry: { [name]: entry },
  mode: 'production',
  bail: true,

  optimization: { minimize: false },
  target: ['browserslist'],

  externals: { 'node:fs/promises': 'import node:fs/promises' },

  experiments: { outputModule: true, typescript: true },

  output: {
    chunkFormat: false,
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist-test', name),
    clean: true,
    library: { type: 'module' }
  },

  // These bundles only exist for the tests, so their size doesn't matter.
  performance: { hints: false }
}));
