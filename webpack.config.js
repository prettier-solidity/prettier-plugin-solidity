import path from 'node:path';
import createEsmUtils from 'esm-utils';
import webpack from 'webpack';

const { __dirname } = createEsmUtils(import.meta);

const globalObject = `
  typeof globalThis !== 'undefined' ? globalThis
  : typeof global !== 'undefined' ? global
  : typeof self !== 'undefined' ? self
  : this || {}
`;

// This is the production and development configuration.
// It is focused on developer experience, fast rebuilds, and a minimal bundle.
export default (webpackEnv) => {
  const isEnvProduction = Boolean(webpackEnv.production);

  return {
    entry: './src/index.js',

    // Avoid bundling Prettier
    externals: {
      prettier: 'global prettier',
      'fs/promises': 'import fs/promises'
    },

    plugins: [
      // TODO: investigate a cleaner way to populate the global variable
      // prettierPlugins in a browser.
      new webpack.BannerPlugin({
        banner: `
var root = ${globalObject};
root["prettierPlugins"] = root["prettierPlugins"] || {}, root["prettierPlugins"]["solidity"] = __webpack_exports__default;
`,
        footer: true,
        raw: true
      })
    ],
    mode: isEnvProduction ? 'production' : 'development',
    bail: isEnvProduction,
    devtool: 'source-map',

    resolve: {
      extensions: ['.ts', '.js'],
      extensionAlias: { '.js': ['.js', '.ts'] }
    },

    experiments: {
      asyncWebAssembly: true,
      topLevelAwait: true,
      outputModule: true
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

    optimization: { minimize: isEnvProduction },
    target: ['browserslist'],
    output: {
      globalObject,
      chunkFormat: false,
      path: path.resolve(__dirname, 'dist'),
      filename: 'standalone.js',
      clean: true,
      library: { type: 'module' }
    },
    performance: {
      maxEntrypointSize: 1024 * 1024,
      maxAssetSize: 1024 * 1024
    }
  };
};
