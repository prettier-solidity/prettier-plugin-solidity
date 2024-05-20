export const ImportDeconstructionSymbol = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    name: ast.name.text,
    alias: ast.alias ? parse(ast.alias, options, parse) : undefined
  }),
  // TODO: implement print
  print: () => ['TODO: ImportDeconstructionSymbol']
};
