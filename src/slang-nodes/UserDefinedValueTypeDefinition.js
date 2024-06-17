export const UserDefinedValueTypeDefinition = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    typeKeyword: ast.typeKeyword.text,
    name: ast.name.text,
    isKeyword: ast.isKeyword.text,
    valueType: parse(ast.valueType, options, parse, offsets),
    semicolon: ast.semicolon.text
  }),
  print: ({ node, path, print }) => [
    `${node.typeKeyword} ${node.name} ${node.isKeyword} `,
    path.call(print, 'valueType'),
    node.semicolon
  ]
};
