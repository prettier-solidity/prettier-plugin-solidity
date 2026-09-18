import prettier from 'prettier/standalone';
import solidityPlugin from 'prettier-plugin-solidity/standalone';

/* global prettierPlugins */

export default async function format(code) {
  const formattedCode = await prettier.format(code, {
    parser: 'slang',
    plugins: [solidityPlugin]
  });
  return formattedCode;
}
