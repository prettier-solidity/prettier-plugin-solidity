export const PathImport = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    path: parse(ast.path, options, parse),
    alias: ast.alias ? parse(ast.alias, options, parse) : undefined
  }),
  // TODO: implement print
  print: () => ['TODO: PathImport']
};
