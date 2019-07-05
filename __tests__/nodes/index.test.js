const nodes = require('../../src/nodes');

test('nodes list to match snapshot', () => {
  expect(Object.keys(nodes)).toMatchSnapshot();
});
