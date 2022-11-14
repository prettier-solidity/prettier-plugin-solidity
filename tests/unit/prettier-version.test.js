const prettier = require('prettier');
const proxyquire = require('proxyquire');

const plugin = proxyquire('../../src', {
  prettier: { ...prettier, version: '2.2.1', '@global': true }
});

test('should throw if the installed version of prettier is less than v2.3.0', async () => {
  const data = 'contract CheckPrettierVersion {}';

  const options = {
    plugins: [plugin],
    parser: 'solidity-parse'
  };

  await expect(async () => {
    await prettier.format(data, options);
  }).rejects.toThrow('>=2.3.0');
});
