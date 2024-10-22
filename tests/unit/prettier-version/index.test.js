import esmockPlugin from './esmock-plugin.js';

test('should throw if the installed version of prettier is less than v2.3.0', async () => {
  const { plugin, prettierMock } = await esmockPlugin();

  const data = 'contract CheckPrettierVersion {}';

  const options = {
    plugins: [plugin],
    parser: 'slang-solidity'
  };

  await expect(async () => {
    await prettierMock.formatWithCursor(data, options);
  }).rejects.toThrow('>=2.3.0');
});
