export const UsingDeconstructionSymbol = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    name: parse(ast.name, options, parse),
    alias: ast.alias ? parse(ast.alias, options, parse) : undefined
  }),
  // TODO: implement print
  print: () => ['UsingDeconstructionSymbol']
};
