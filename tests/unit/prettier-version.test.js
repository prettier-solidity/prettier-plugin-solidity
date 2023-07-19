// eslint-disable-next-line import/no-extraneous-dependencies
import proxyquire from 'proxyquire';
import getPrettier from '../config/get-prettier.js';

// mocking is really difficult in ESM
test.skip('should throw if the installed version of prettier is less than v2.3.0', async () => {
  const prettier = await getPrettier();

  const prettierMock = proxyquire('../config/require-prettier', {
    prettier: { ...prettier, version: '2.2.1', '@global': true }
  });

  const plugin = proxyquire(
    process.env.TEST_STANDALONE ? '../../dist/standalone' : '../../src/index',
    {
      prettier: prettierMock
    }
  );

  const data = 'contract CheckPrettierVersion {}';

  const options = {
    plugins: [plugin],
    parser: 'solidity-parse'
  };

  await expect(async () => {
    await prettierMock.formatWithCursor(data, options);
  }).rejects.toThrow('>=2.3.0');
});
