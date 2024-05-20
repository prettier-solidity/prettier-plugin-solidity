export const ReturnStatement = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    returnKeyword: ast.returnKeyword.text,
    expression: ast.expression
      ? parse(ast.expression, options, parse)
      : undefined,
    semicolon: ast.semicolon.text
  }),
  // TODO: implement print
  print: () => ['TODO: ReturnStatement']
};
