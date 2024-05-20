export const VariableDeclarationValue = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    equal: ast.equal.text,
    expression: parse(ast.expression, options, parse)
  }),
  // TODO: implement print
  print: () => ['TODO: VariableDeclarationValue']
};
