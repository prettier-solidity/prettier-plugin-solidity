export const ErrorParametersDeclaration = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    openParen: ast.openParen.text,
    parameters: parse(ast.parameters, options, parse),
    closeParen: ast.closeParen.text
  }),
  // TODO: implement print
  print: () => ['ErrorParametersDeclaration']
};
