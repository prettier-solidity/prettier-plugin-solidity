import path from 'node:path';
// eslint-disable-next-line import/no-extraneous-dependencies
import createEsmUtils from 'esm-utils';

const { __dirname } = createEsmUtils(import.meta);

// This is the production and development configuration.
// It is focused on developer experience, fast rebuilds, and a minimal bundle.
export default {
  entry: './tests/integration/test-app.js',
  mode: 'production',
  bail: true,

  optimization: { minimize: false },
  target: ['browserslist'],

  output: {
    filename: 'test.cjs',
    path: path.resolve(__dirname, 'dist'),
    globalObject: `
      typeof globalThis !== "undefined"
        ? globalThis
        : typeof global !== "undefined"
        ? global
        : typeof self !== "undefined"
        ? self
        : this || {}
    `,
    library: {
      export: 'default',
      name: {
        commonjs: 'format',
        root: 'format'
      },
      type: 'umd2'
    }
  },

  performance: {
    maxEntrypointSize: 1024 * 1024,
    maxAssetSize: 1024 * 1024
  }
};
