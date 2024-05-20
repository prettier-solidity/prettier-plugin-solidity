export const ReturnsDeclaration = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    returnsKeyword: ast.returnsKeyword,
    variables: parse(ast.variables, options, parse)
  }),
  // TODO: implement print
  print: () => ['TODO: ReturnsDeclaration']
};
