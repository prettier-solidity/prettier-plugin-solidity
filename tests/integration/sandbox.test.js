test('Should run a test app in a sandbox', async () => {
  const data = 'contract    CheckPackage {}';
  const entry = new URL('./sandbox-test-app.cjs', import.meta.url);

  const { format } = await import(entry).then((module) => module.default);

  expect(await format(data)).toEqual('contract CheckPackage {}\n');
});
