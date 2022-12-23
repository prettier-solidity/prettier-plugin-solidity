const genericPrint = require('../../src/printer');

test('given an unknown module type then genericPrint function should throw', () => {
  const mockPath = { getValue: () => ({ type: 'UnknownModule' }) };
  const node = mockPath.getValue();

  expect(() => {
    genericPrint(mockPath);
  }).toThrow(`Unknown type: ${JSON.stringify(node.type)}`);
});

test('if the AST contains a null node, print an empty string', () => {
  // Prettier V3 avoids returning null when traversing the AST, but V2 does not.
  // By mocking this, we ensure both cases are covered.
  const mockPath = { getValue: () => null };

  expect(genericPrint(mockPath)).toEqual('');
});
