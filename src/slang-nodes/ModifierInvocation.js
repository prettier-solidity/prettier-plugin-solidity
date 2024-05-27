export const ModifierInvocation = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    name: parse(ast.name, options, parse),
    arguments: ast.arguments ? parse(ast.arguments, options, parse) : undefined
  }),
  print: ({ node, path, print }) => [
    path.call(print, 'name'),
    node.arguments ? path.call(print, 'arguments') : ''
  ]
};
