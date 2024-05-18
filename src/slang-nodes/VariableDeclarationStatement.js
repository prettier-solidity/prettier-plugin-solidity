export const VariableDeclarationStatement = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    variableType: parse(ast.variableType, options, parse),
    storageLocation: ast.storageLocation
      ? parse(ast.storageLocation, options, parse)
      : undefined,
    name: ast.name.text,
    value: ast.value ? parse(ast.value, options, parse) : undefined,
    semicolon: ast.semicolon.text
  }),
  // TODO: implement print
  print: () => ['TypedTupleMember']
};
