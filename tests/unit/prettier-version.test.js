const { TEST_STANDALONE } = process.env;

const prettier = !TEST_STANDALONE
  ? require('../config/require-prettier')
  : require('../config/require-standalone');

const proxyquire = require('proxyquire');

const plugin = proxyquire(
  TEST_STANDALONE ? '../../dist/standalone.js' : '../../src/index.js',
  {
    prettier: { ...prettier, version: '2.2.1', '@global': true }
  }
);

test('should throw if the installed version of prettier is less than v2.3.0', async () => {
  const data = 'contract CheckPrettierVersion {}';

  const options = {
    plugins: [plugin],
    parser: 'solidity-parse'
  };

  await expect(async () => {
    await prettier.formatWithCursor(data, options);
  }).rejects.toThrow('>=2.3.0');
});
