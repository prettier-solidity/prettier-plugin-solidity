export const ErrorParameter = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    typeName: parse(ast.typeName, options, parse),
    name: ast.name?.text
  }),
  // TODO: implement print
  print: () => ['ErrorParameter']
};
