import genericPrint from '../../src/printer.ts';

test('given an unknown operator then the BinaryOperation print function should throw', () => {
  const mockPath = { node: { type: 'BinaryOperation', operator: '?' } };

  expect(() => {
    genericPrint(mockPath);
  }).toThrow(
    `Assertion error: no printer found for operator ${JSON.stringify(
      mockPath.node.operator
    )}`
  );
});
