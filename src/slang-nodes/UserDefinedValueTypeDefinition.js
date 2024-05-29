export const UserDefinedValueTypeDefinition = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    typeKeyword: ast.typeKeyword.text,
    name: ast.name.text,
    isKeyword: ast.isKeyword.text,
    valueType: parse(ast.valueType, options, parse),
    semicolon: ast.semicolon.text
  }),
  print: ({ node, path, print }) => [
    `${node.typeKeyword} ${node.name} ${node.isKeyword} `,
    path.call(print, 'valueType'),
    node.semicolon
  ]
};
