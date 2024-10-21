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
      prettier: 'prettier/standalone',
      'fs/promises': 'fs/promises'
    },

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
      chunkFormat: false,
      path: path.resolve(__dirname, 'dist'),
      filename: 'standalone.js',
      clean: true,
      library: { export: 'default', type: 'module' }
    },
    performance: {
      maxEntrypointSize: 1024 * 1024,
      maxAssetSize: 1024 * 1024
    }
  };
};
