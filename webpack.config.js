const path = require('path');
// This is the production and development configuration.
// It is focused on developer experience, fast rebuilds, and a minimal bundle.
module.exports = function (webpackEnv) {
  const isEnvProduction = webpackEnv === 'production';
  return {
    target: ['browserslist'],
    // We tell webpack to use the browser friendly package.
    resolve: {
      alias: {
        '@solidity-parser/parser': '@solidity-parser/parser/dist/index.iife.js'
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
    bail: isEnvProduction,
    devtool: isEnvProduction ? undefined : 'cheap-module-source-map',
    optimization: {
      minimize: isEnvProduction
    },
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'standalone.js',
      library: { type: 'commonjs' }
    }
  };
};
