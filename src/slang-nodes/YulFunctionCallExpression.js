export const YulFunctionCallExpression = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    operand: parse(ast.operand, options, parse),
    openParen: ast.openParen.text,
    arguments: parse(ast.arguments, options, parse),
    closeParen: ast.closeParen.text
  }),
  // TODO: implement print
  print: () => ['TODO: YulFunctionCallExpression']
};
