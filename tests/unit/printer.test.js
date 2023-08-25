import genericPrint from '../../src/printer.js';

test('given an unknown module type then genericPrint function should throw', () => {
  const mockPath = { getNode: () => ({ type: 'UnknownModule' }) };
  const node = mockPath.getNode();

  expect(() => {
    genericPrint(mockPath);
  }).toThrow(`Unknown type: ${JSON.stringify(node.type)}`);
});

test('if the AST contains a null node, print an empty string', () => {
  // Prettier V3 avoids returning null when traversing the AST, but V2 does not.
  // By mocking this, we ensure both cases are covered.
  const mockPath = { getNode: () => null };

  expect(genericPrint(mockPath)).toEqual('');
});
