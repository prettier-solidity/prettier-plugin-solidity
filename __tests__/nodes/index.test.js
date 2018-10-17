const nodes = require('../../src/nodes');

test('nodes list to match snapshot', () => {
  const list = Object.keys(nodes).map(key => key);

  expect(list).toMatchSnapshot();
});
