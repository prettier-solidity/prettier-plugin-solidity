export const InheritanceType = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    typeName: parse(ast.typeName, options, parse),
    arguments: ast.arguments ? parse(ast.arguments, options, parse) : undefined
  }),
  // TODO: implement print
  print: () => ['InheritanceType']
};
