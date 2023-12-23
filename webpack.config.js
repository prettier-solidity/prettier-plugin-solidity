import path from 'node:path';
import createEsmUtils from 'esm-utils';

const { __dirname } = createEsmUtils(import.meta);

// This is the production and development configuration.
// It is focused on developer experience, fast rebuilds, and a minimal bundle.
export default (webpackEnv) => {
  const isEnvProduction = Boolean(webpackEnv.production);

  return {
    entry: './src/index.js',

    // Avoid bundling Prettier
    externals: {
      prettier: {
        // use 'prettier/standalone' in case the project importing this file is
        // bundling for the browser.
        amd: 'prettier/standalone',
        commonjs: 'prettier/standalone',
        commonjs2: 'prettier/standalone',
        root: 'prettier' // global variable if it was loaded by the browser
      }
    },

    mode: isEnvProduction ? 'production' : 'development',
    bail: isEnvProduction,
    devtool: 'source-map',

    resolve: {
      extensions: ['.ts', '.js'],
      extensionAlias: {
        '.js': ['.js', '.ts']
      }
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
    optimization: {
      minimize: isEnvProduction
    },
    target: ['browserslist'],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'standalone.cjs',
      clean: true,
      globalObject: `
        typeof globalThis !== 'undefined' ? globalThis
        : typeof global !== 'undefined' ? global
        : typeof self !== 'undefined' ? self
        : this || {}
      `,
      library: {
        export: 'default',
        name: {
          commonjs: 'prettierPluginSolidity',
          root: ['prettierPlugins', 'solidity']
        },
        type: 'umd2'
      }
    },
    performance: {
      maxEntrypointSize: 1024 * 1024,
      maxAssetSize: 1024 * 1024
    }
  };
};
