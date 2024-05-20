export const Parameter = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    typeName: parse(ast.typeName, options, parse),
    storageLocation: ast.storageLocation
      ? parse(ast.storageLocation, options, parse)
      : undefined,
    name: ast.name?.text
  }),
  // TODO: implement print
  print: () => ['TODO: Parameter']
};
