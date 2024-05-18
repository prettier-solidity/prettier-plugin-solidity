export const YulReturnsDeclaration = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    minusGreaterThan: ast.minusGreaterThan.text,
    variables: parse(ast.variables, options, parse)
  }),
  // TODO: implement print
  print: () => ['YulReturnsDeclaration']
};
