export const Parameter = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    typeName: parse(ast.typeName, options, parse, offsets),
    storageLocation: ast.storageLocation
      ? parse(ast.storageLocation, options, parse, offsets)
      : undefined,
    name: ast.name?.text
  }),
  print: ({ node, path, print }) => [
    path.call(print, 'typeName'),
    node.storageLocation ? ` ${path.call(print, 'storageLocation')}` : '',
    node.name ? ` ${node.name}` : ''
  ]
};
