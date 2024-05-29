export const MappingKey = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    keyType: parse(ast.keyType, options, parse),
    name: ast.name?.text
  }),
  print: ({ node, path, print }) => [
    path.call(print, 'keyType'),
    node.name ? ` ${node.name}` : ''
  ]
};
