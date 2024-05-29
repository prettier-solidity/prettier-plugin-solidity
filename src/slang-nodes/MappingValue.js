export const MappingValue = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    typeName: parse(ast.typeName, options, parse),
    name: ast.name?.text
  }),
  print: ({ node, path, print }) => [
    path.call(print, 'typeName'),
    node.name ? ` ${node.name}` : ''
  ]
};
