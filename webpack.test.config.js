import path from 'node:path';

const __dirname = import.meta.dirname;

export default {
  entry: {
    test: './tests/integration/test-app/test-app.js',
    'create-parser': './tests/config/create-parser-entry.js',
    'variant-coverage': './variant-coverage/index.ts'
  },
  mode: 'production',
  bail: true,

  optimization: { minimize: false },
  target: ['browserslist'],

  externals: { 'node:fs/promises': 'import node:fs/promises' },

  experiments: { outputModule: true, typescript: true },

  output: {
    chunkFormat: false,
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    library: { type: 'module' }
  },

  // These bundles only exist for the tests, so their size doesn't matter.
  performance: { hints: false }
};
