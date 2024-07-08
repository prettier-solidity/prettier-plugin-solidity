export const VariableDeclarationStatement = {
  parse: ({ offsets, ast, options, parse }) => ({
    variableType: parse(ast.variableType, options, parse, offsets),
    storageLocation: ast.storageLocation
      ? parse(ast.storageLocation, options, parse, offsets)
      : undefined,
    name: ast.name.text,
    value: ast.value ? parse(ast.value, options, parse, offsets) : undefined,
    semicolon: ast.semicolon.text
  }),
  print: ({ node, path, print }) => [
    path.call(print, 'variableType'),
    node.storageLocation ? [' ', path.call(print, 'storageLocation')] : '',
    ` ${node.name}`,
    node.value ? path.call(print, 'value') : '',
    node.semicolon
  ]
};
