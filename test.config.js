import path from 'node:path';
import createEsmUtils from 'esm-utils';
import prettier from 'prettier';
import { satisfies } from 'semver';

const { __dirname } = createEsmUtils(import.meta);

export default {
  entry: './tests/integration/test-app.js',
  mode: 'production',
  bail: true,

  optimization: { minimize: false },
  target: ['browserslist'],

  externals: { 'fs/promises': 'fs/promises' },

  resolve: {
    alias: {
      prettier: satisfies(prettier.version, '^2.3.0')
        ? 'prettier/standalone.js'
        : 'prettier/standalone'
    }
  },

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
