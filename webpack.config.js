import path from 'node:path';
import { createRequire } from 'node:module';
import createEsmUtils from 'esm-utils';

const require = createRequire(import.meta.url);
const { __dirname } = createEsmUtils(import.meta);

// This is the production and development configuration.
// It is focused on developer experience, fast rebuilds, and a minimal bundle.
export default (webpackEnv) => {
  const isEnvProduction = Boolean(webpackEnv.production);

  return {
    entry: './src/index.js',

    // Avoid bundling Prettier
    externals: {
      prettier: 'prettier'
    },

    mode: isEnvProduction ? 'production' : 'development',
    bail: isEnvProduction,
    devtool: 'source-map',

    // We tell webpack to use the browser friendly package.
    resolve: {
      alias: {
        '@solidity-parser/parser': '@solidity-parser/parser/dist/index.iife.js'
      },
      fallback: {
        util: false
      }
    },

    module: {
      rules: [
        {
          // We tell webpack to append "module.exports = SolidityParser;" at the
          // end of the file.
          test: require.resolve('@solidity-parser/parser/dist/index.iife.js'),
          loader: 'exports-loader',
          options: {
            type: 'commonjs',
            exports: 'single SolidityParser'
          }
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
