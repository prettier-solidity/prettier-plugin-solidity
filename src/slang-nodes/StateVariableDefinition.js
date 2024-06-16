export const StateVariableDefinition = {
  parse: ({ ast, options, parse }) => ({
    typeName: parse(ast.typeName, options, parse),
    attributes: parse(ast.attributes, options, parse),
    name: ast.name.text,
    value: ast.value ? parse(ast.value, options, parse) : undefined,
    semicolon: ast.semicolon.text
  }),
  print: ({ node, path, print }) => [
    path.call(print, 'typeName'),
    path.call(print, 'attributes'),
    ` ${node.name}`,
    node.value ? path.call(print, 'value') : '',
    node.semicolon
  ]
};
