import path from 'node:path';
import createEsmUtils from 'esm-utils';

const { __dirname } = createEsmUtils(import.meta);

export default {
  entry: {
    test: './tests/integration/test-app/test-app.js',
    'create-parser': './src/slang-utils/create-parser.js',
    'variant-coverage': './variant-coverage/index.js'
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
        use: [
          {
            loader: 'ts-loader',
            // This test file includes the variant-coverage directory, which is not included in the main tsconfig.json
            options: { configFile: 'tsconfig.test.json' }
          }
        ],
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
