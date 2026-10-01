import path from 'node:path';

const __dirname = import.meta.dirname;

// This is the production and development configuration.
// It is focused on developer experience, fast rebuilds, and a minimal bundle.
export default (webpackEnv) => {
  const isEnvProduction = Boolean(webpackEnv.production);

  return {
    entry: './src/browser.ts',

    externals: {
      'node:fs/promises': 'import node:fs/promises'
    },

    mode: isEnvProduction ? 'production' : 'development',
    bail: isEnvProduction,
    devtool: 'source-map',

    experiments: { outputModule: true, typescript: true },

    target: ['browserslist'],
    output: {
      chunkFormat: false,
      path: path.resolve(__dirname, 'dist'),
      filename: 'standalone.js',
      clean: true,
      library: { type: 'module' }
    },
    performance: {
      // Slang's parser is a 4 MiB .wasm file we can't shrink; only check our
      // JavaScript against the limits.
      assetFilter: (assetFilename) => !/\.(map|wasm)$/.test(assetFilename),
      maxEntrypointSize: 1024 * 1024,
      maxAssetSize: 1024 * 1024
    }
  };
};
