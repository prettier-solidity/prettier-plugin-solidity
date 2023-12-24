import { printers } from '../../../src/binary-operator-printers/index.js';

test('binary operators printers to match snapshot', () => {
  expect(Object.keys(printers)).toMatchSnapshot();
});
