const genericPrint = require('../../src/printer');

test('given an unknown module type then genericPrint function should throw', () => {
  const mockPath = {
    getValue: () => ({ type: 'BinaryOperation', operator: '?' })
  };
  const node = mockPath.getValue();

  expect(() => {
    genericPrint(mockPath);
  }).toThrow(
    `Assertion error: no printer found for operator ${JSON.stringify(
      node.operator
    )}`
  );
});
