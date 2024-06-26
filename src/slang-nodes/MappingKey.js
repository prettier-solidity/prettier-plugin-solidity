export const MappingKey = {
  parse: ({ offsets, ast, options, parse }) => ({
    keyType: parse(ast.keyType, options, parse, offsets),
    name: ast.name?.text
  }),
  print: ({ node, path, print }) => [
    path.call(print, 'keyType'),
    node.name ? ` ${node.name}` : ''
  ]
};
