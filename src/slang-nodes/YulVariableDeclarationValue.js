export const YulVariableDeclarationValue = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    assignment: parse(ast.assignment, options, parse),
    expression: parse(ast.expression, options, parse)
  }),
  // TODO: implement print
  print: () => ['TODO: YulVariableDeclarationValue']
};
