export const ExpressionStatement = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    expression: parse(ast.expression, options, parse),
    semicolon: ast.semicolon.text
  }),
  // TODO: implement print
  print: () => ['TODO: ExpressionStatement']
};
