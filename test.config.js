import path from 'node:path';
import createEsmUtils from 'esm-utils';

const { __dirname } = createEsmUtils(import.meta);

export default {
  entry: './tests/integration/test-app.js',
  mode: 'production',
  bail: true,

  optimization: { minimize: false },
  target: ['browserslist'],

  externals: { 'fs/promises': 'fs/promises' },

  experiments: {
    asyncWebAssembly: true,
    topLevelAwait: true,
    outputModule: true
  },

  output: {
    filename: 'test.js',
    path: path.resolve(__dirname, 'dist'),
    library: { type: 'module' }
  },

  performance: {
    maxEntrypointSize: 1024 * 1024,
    maxAssetSize: 1024 * 1024
  }
};
