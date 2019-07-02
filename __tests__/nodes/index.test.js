const nodes = require('../../src/nodes');
const binary_operator_printers = require('../../src/binary-operator-printers');

test('nodes list to match snapshot', () => {
  expect(Object.keys(nodes)).toMatchSnapshot();
});

test('binary operators list to match snapshot', () => {
  expect(Object.keys(binary_operator_printers)).toMatchSnapshot();
});
