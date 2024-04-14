// eslint-disable-next-line import/no-unresolved
import format from '../../dist/test.cjs';

test('Should run a test app in a node environment', async () => {
  const data = 'contract    CheckPackage {}';

  expect(await format(data)).toEqual('contract CheckPackage {}\n');
});
