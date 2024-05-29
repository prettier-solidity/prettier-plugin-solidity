export const UserDefinedValueTypeDefinition = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    typeKeyword: ast.typeKeyword.text,
    name: ast.name.text,
    isKeyword: ast.isKeyword.text,
    valueType: parse(ast.valueType, options, parse),
    semicolon: ast.semicolon.text
  }),
  // TODO: implement print
  print: ({ node, path, print, options }) => [
    'TODO: UserDefinedValueTypeDefinition'
  ]
};
