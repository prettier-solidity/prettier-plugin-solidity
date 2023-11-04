import prettier from 'prettier/standalone.js';
// eslint-disable-next-line import/no-unresolved
import solidityPlugin from '../../dist/standalone.cjs';

export default async function format(code) {
  const formattedCode = await prettier.format(code, {
    parser: 'solidity-parse',
    plugins: [solidityPlugin]
  });
  return formattedCode;
}
