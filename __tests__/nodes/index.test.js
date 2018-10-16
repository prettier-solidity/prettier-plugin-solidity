const nodes = require('../../src/nodes');

test('nodes list to match snapshot', () => {
  const list = Object.keys(nodes).reduce((accumulator, current) => {
    accumulator.push(current);
    return accumulator;
  }, []);

  expect(list).toMatchSnapshot();
});
