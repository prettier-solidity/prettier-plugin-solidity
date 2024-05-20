export const EventParameter = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    typeName: parse(ast.typeName, options, parse),
    indexedKeyword: ast.indexedKeyword?.text,
    name: ast.name?.text
  }),
  // TODO: implement print
  print: () => ['TODO: EventParameter']
};