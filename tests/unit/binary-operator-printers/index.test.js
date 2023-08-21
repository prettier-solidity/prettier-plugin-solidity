import * as binaryOperatorPrinters from '../../../src/binary-operator-printers/index.js';

test('binary operators printers to match snapshot', () => {
  expect(Object.keys(binaryOperatorPrinters)).toMatchSnapshot();
});
