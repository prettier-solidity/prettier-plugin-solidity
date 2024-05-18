export const MappingKey = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    keyType: parse(ast.keyType, options, parse),
    name: ast.name?.text
  }),
  // TODO: implement print
  print: () => ['MappingKey']
};
