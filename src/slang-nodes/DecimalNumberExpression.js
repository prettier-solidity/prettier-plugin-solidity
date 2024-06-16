export const DecimalNumberExpression = {
  parse: ({ ast, options, parse }) => ({
    literal: ast.literal.text,
    unit: ast.unit ? parse(ast.unit, options, parse) : undefined
  }),
  print: ({ node, path, print }) => [
    node.literal,
    node.unit ? [' ', path.call(print, 'unit')] : ''
  ]
};
