export const PostfixExpression = {
  parse: ({ offsets, ast, options, parse }) => ({
    operand: parse(ast.operand, options, parse, offsets),
    operator: ast.operator.text
  }),
  print: ({ node, path, print }) => [path.call(print, 'operand'), node.operator]
};
