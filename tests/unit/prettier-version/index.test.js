test('should throw if the installed version of prettier is less than v2.3.0', async () => {
  const entry = process.env.TEST_STANDALONE
    ? new URL('./proxyquire-plugin.cjs', import.meta.url) // standalone uses proxyquire to mock cjs
    : './esmock-plugin.js'; // uses esmock to mock esm

  const { plugin, prettierMock } = await import(entry).then((module) =>
    module.default()
  );

  const data = 'contract CheckPrettierVersion {}';

  const options = {
    plugins: [plugin],
    parser: 'slang'
  };

  await expect(async () => {
    await prettierMock.formatWithCursor(data, options);
  }).rejects.toThrow('>=2.3.0');
});
