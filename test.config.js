import path from 'node:path';
import createEsmUtils from 'esm-utils';

const { __dirname } = createEsmUtils(import.meta);

export default {
  entry: {
    test: './tests/integration/test-app.js',
    'create-parser': './src/slang-utils/create-parser.js'
  },
  mode: 'production',
  bail: true,

  optimization: { minimize: false },
  target: ['browserslist'],

  externals: { 'node:fs/promises': 'import node:fs/promises' },

  resolve: {
    extensions: ['.ts', '.js'],
    extensionAlias: { '.js': ['.js', '.ts'] }
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },

  experiments: { outputModule: true },

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
