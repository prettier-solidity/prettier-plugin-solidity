import { createHash } from 'node:crypto';
import { copyFile, mkdir, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import packageJson from './package.json' with { type: 'json' };

// Slang loads its .wasm files with `new URL('./….wasm', import.meta.url)`,
// which esbuild doesn't treat as a dependency. For every .wasm file next to a
// module that mentions it, this renames the path to the file's content hash and
// copies the file to the outdir. Since the URL stays a plain `./….wasm` path,
// a bundle can be bundled again (the test app bundles `dist/standalone.js`).
const wasmUrlPlugin = {
  name: 'wasm-url',
  setup(build) {
    // hashed file name -> absolute source path
    const files = new Map();

    build.onLoad({ filter: /\.m?js$/ }, async ({ path: file }) => {
      const dir = path.dirname(file);
      const wasmFiles = (await readdir(dir)).filter((name) =>
        name.endsWith('.wasm')
      );
      if (wasmFiles.length === 0) return undefined;

      let contents = await readFile(file, 'utf8');
      let changed = false;
      for (const wasmFile of wasmFiles) {
        const specifier = `./${wasmFile}`;
        if (!contents.includes(specifier)) continue;

        const source = path.join(dir, wasmFile);
        const hash = createHash('sha256')
          .update(await readFile(source))
          .digest('hex')
          .slice(0, 20);
        const name = `${hash}.wasm`;
        files.set(name, source);
        contents = contents.replaceAll(specifier, `./${name}`);
        changed = true;
      }
      return changed ? { contents, loader: 'js' } : undefined;
    });

    build.onEnd(async (result) => {
      if (result.errors.length > 0) return;
      const { outdir } = build.initialOptions;
      await mkdir(outdir, { recursive: true });
      await Promise.all(
        [...files].map(([name, source]) =>
          copyFile(source, path.join(outdir, name))
        )
      );
    });
  }
};

export const sharedOptions = {
  bundle: true,
  format: 'esm',
  platform: 'browser',
  target: ['es2023', ...browserslistToEsbuild(packageJson.browserslist)],
  // Slang only imports this in Node, where it reads its .wasm files from disk.
  external: ['node:fs/promises'],
  plugins: [wasmUrlPlugin],
  logLevel: 'warning'
};
