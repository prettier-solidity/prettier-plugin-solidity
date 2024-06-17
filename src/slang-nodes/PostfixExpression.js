export const PostfixExpression = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    operand: parse(ast.operand, options, parse, offsets),
    operator: ast.operator.text
  }),
  print: ({ node, path, print }) => [path.call(print, 'operand'), node.operator]
};
