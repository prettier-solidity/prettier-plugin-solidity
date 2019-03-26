const PragmaDirective = require('../../src/nodes/PragmaDirective');

test('nodes list to match snapshot', () => {
  expect(
    PragmaDirective.print({
      node: {
        name: 'solidity',
        value: "not a valid range but shouldn't be replaced with an null value."
      }
    })
  ).toMatchSnapshot();
});
