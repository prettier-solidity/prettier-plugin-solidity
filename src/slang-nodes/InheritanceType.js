export const InheritanceType = {
  parse: ({ ast, options, parse }) => ({
    typeName: parse(ast.typeName, options, parse),
    arguments: ast.arguments ? parse(ast.arguments, options, parse) : undefined
  }),
  print: ({ node, path, print }) => [
    path.call(print, 'typeName'),
    node.arguments ? path.call(print, 'arguments') : ''
  ]
};
