export const PrefixExpression = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    operator: ast.operator.text,
    operand: parse(ast.operand, options, parse, offsets)
  }),
  print: ({ node, path, print }) => [node.operator, path.call(print, 'operand')]
};
