import genericPrint from '../../src/printer.js';

test('given an unknown operator then the BinaryOperation print function should throw', () => {
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
