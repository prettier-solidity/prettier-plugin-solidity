require('jest-mock-now')();
const makeData = require('./makeData');

test('makeData to match snapshot for nodes', () => {
  expect(makeData('../src/nodes')).toMatchSnapshot();
});

test('makeData to match snapshot for binary-operator-printers', () => {
  expect(makeData('../src/binary-operator-printers')).toMatchSnapshot();
});
