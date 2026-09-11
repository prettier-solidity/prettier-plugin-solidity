import prettier from 'prettier/standalone';
import '../../../dist/standalone.js';

/* global prettierPlugins */

export default async function format(code) {
  const formattedCode = await prettier.format(code, {
    parser: 'slang',
    plugins: prettierPlugins
  });
  return formattedCode;
}
