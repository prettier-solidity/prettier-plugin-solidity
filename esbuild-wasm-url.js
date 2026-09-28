import { readFile } from 'node:fs/promises';

// Slang loads its .wasm files with `new URL('./….wasm', import.meta.url)`,
// which esbuild doesn't treat as a dependency. This turns each of those URLs
// into an import, so esbuild's `.wasm` loader copies the file and the URL
// points at the copy.
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

export const wasmUrlPlugin = {
  name: 'wasm-url',
  setup(build) {
    build.onLoad({ filter: /\.m?js$/ }, async ({ path }) => {
      const code = await readFile(path, 'utf8');
      const imports = [];
      const contents = code.replace(wasmUrl, (_, _quote, specifier) => {
        const name = `__wasm${imports.length}`;
        imports.push(`import ${name} from ${JSON.stringify(specifier)};`);
        return `new URL(${name}, import.meta.url)`;
      });
      if (imports.length === 0) return undefined;
      return { contents: `${imports.join('\n')}\n${contents}`, loader: 'js' };
    });
  }
};
