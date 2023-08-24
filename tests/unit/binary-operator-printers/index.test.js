import { printers } from '../../../src/binary-operator-printers/index.ts';

test('binary operators printers to match snapshot', () => {
  expect(Object.keys(printers)).toMatchSnapshot();
});
