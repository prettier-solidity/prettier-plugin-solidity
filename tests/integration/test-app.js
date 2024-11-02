import prettier from 'prettier/standalone';
import '../../dist/standalone.js';

export default async function format(code) {
  const formattedCode = await prettier.format(code, {
    parser: 'slang-solidity',
    plugins: prettierPlugins
  });
  return formattedCode;
}
