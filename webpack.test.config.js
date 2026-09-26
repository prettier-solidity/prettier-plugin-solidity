import path from 'node:path';

const __dirname = import.meta.dirname;

export default {
  entry: {
    test: './tests/integration/test-app/test-app.js',
    'create-parser': './src/slang-utils/create-parser.ts',
    'variant-coverage': './variant-coverage/index.ts'
  },
  mode: 'production',
  bail: true,

  optimization: { minimize: false },
  target: ['browserslist'],

  externals: { 'node:fs/promises': 'import node:fs/promises' },

  experiments: { outputModule: true, typescript: true },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    library: { type: 'module' }
  },

  performance: {
    maxEntrypointSize: 1024 * 1024,
    maxAssetSize: 1024 * 1024
  }
};
