export const PostfixExpression = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    operand: parse(ast.operand, options, parse),
    operator: ast.operator.text
  }),
  // TODO: implement print
  print: () => ['TODO: PostfixExpression']
};
