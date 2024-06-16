export const PostfixExpression = {
  parse: ({ ast, options, parse }) => ({
    operand: parse(ast.operand, options, parse),
    operator: ast.operator.text
  }),
  print: ({ node, path, print }) => [path.call(print, 'operand'), node.operator]
};
