export const Parameter = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    typeName: parse(ast.typeName, options, parse),
    storageLocation: ast.storageLocation
      ? parse(ast.storageLocation, options, parse)
      : undefined,
    name: ast.name?.text
  }),
  print: ({ node, path, print }) => [
    path.call(print, 'typeName'),
    node.storageLocation ? ` ${path.call(print, 'storageLocation')} ` : ' ',
    node.name
  ]
};
