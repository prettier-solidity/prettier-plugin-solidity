import { createHash } from 'node:crypto';
import { copyFile, mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import packageJson from './package.json' with { type: 'json' };

// Slang loads its .wasm files with `new URL('./….wasm', import.meta.url)`,
// which esbuild doesn't treat as a dependency. This keeps each of those URLs,
// renames the file to its content hash and copies it to the outdir, so the
// bundle can be bundled again (the test app bundles `dist/standalone.js`).
const wasmUrl = new RegExp(
  [
    /new URL\(\s*/, // `new URL(` and any whitespace after it
    /(['"`])/, // 1: the opening quote, whichever kind it is
    /(\.{1,2}\/[^'"`]+\.wasm)/, // 2: a `./` or `../` path ending in `.wasm`
    /\1/, // the same quote closes the path
    /\s*,\s*import\.meta\.url\s*\)/ // `, import.meta.url)`, with any whitespace
  ]
    .map((part) => part.source)
    .join(''),
  'g'
);

const wasmUrlPlugin = {
  name: 'wasm-url',
  setup(build) {
    // hashed file name -> absolute source path
    const files = new Map();

    build.onLoad({ filter: /\.m?js$/ }, async ({ path: file }) => {
      const code = await readFile(file, 'utf8');
      const matches = [...code.matchAll(wasmUrl)];
      if (matches.length === 0) return undefined;

      let contents = code;
      for (const [match, , specifier] of matches) {
        const source = path.resolve(path.dirname(file), specifier);
        const hash = createHash('sha256')
          .update(await readFile(source))
          .digest('hex')
          .slice(0, 20);
        const name = `${hash}.wasm`;
        files.set(name, source);
        contents = contents.replace(
          match,
          `new URL(${JSON.stringify(`./${name}`)}, import.meta.url)`
        );
      }
      return { contents, loader: 'js' };
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
