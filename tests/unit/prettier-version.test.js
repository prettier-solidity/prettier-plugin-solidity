const { TEST_STANDALONE } = process.env;

const prettier = TEST_STANDALONE
  ? require('prettier/standalone')
  : require('prettier');

const proxyquire = require('proxyquire');

const prettierMock = proxyquire('../config/require-prettier', {
  prettier: { ...prettier, version: '2.2.1', '@global': true }
});

const plugin = proxyquire(
  TEST_STANDALONE ? '../../dist/standalone' : '../../src/index',
  {
    prettier: prettierMock
  }
);

test('should throw if the installed version of prettier is less than v2.3.0', async () => {
  const data = 'contract CheckPrettierVersion {}';

  const options = {
    plugins: [plugin],
    parser: 'solidity-parse'
  };

  await expect(async () => {
    await prettierMock.formatWithCursor(data, options);
  }).rejects.toThrow('>=2.3.0');
});
