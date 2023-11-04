import prettier from 'prettier/standalone';
import solidityPlugin from '../../dist/standalone.cjs';

export default async function format(code) {
  const formattedCode = await prettier.format(code, {
    parser: 'solidity-parse',
    plugins: [solidityPlugin]
  });
  return formattedCode;
}
