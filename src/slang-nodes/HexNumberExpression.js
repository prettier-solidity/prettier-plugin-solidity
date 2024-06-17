export const HexNumberExpression = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    literal: ast.literal.text,
    unit: ast.unit ? parse(ast.unit, options, parse, offsets) : undefined
  }),
  print: ({ node, path, print }) => [
    node.literal,
    node.unit ? [' ', path.call(print, 'unit')] : ''
  ]
};
