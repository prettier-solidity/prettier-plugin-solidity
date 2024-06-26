export const StateVariableDefinition = {
  parse: ({ offsets, ast, options, parse }) => ({
    typeName: parse(ast.typeName, options, parse, offsets),
    attributes: parse(ast.attributes, options, parse, offsets),
    name: ast.name.text,
    value: ast.value ? parse(ast.value, options, parse, offsets) : undefined,
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
