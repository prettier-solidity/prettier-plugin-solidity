export const MappingValue = {
  parse: ({ ast, options, parse }) => ({
    typeName: parse(ast.typeName, options, parse),
    name: ast.name?.text
  }),
  print: ({ node, path, print }) => [
    path.call(print, 'typeName'),
    node.name ? ` ${node.name}` : ''
  ]
};
