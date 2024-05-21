export const StateVariableDefinitionValue = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    equal: ast.equal.text,
    value: parse(ast.value, options, parse)
  }),
  print: ({ node, path, print }) => [
    ' ',
    node.equal,
    ' ',
    path.call(print, 'value')
  ]
};
