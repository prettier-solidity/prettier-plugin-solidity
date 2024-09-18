import prettier from 'prettier/standalone.js';
import solidityPlugin from '../../dist/standalone.cjs';

export default async function format(code) {
  const formattedCode = await prettier.format(code, {
    parser: 'slang-solidity',
    plugins: [solidityPlugin]
  });
  return formattedCode;
}
