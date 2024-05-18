export const NamedImport = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    asterisk: ast.asterisk.text,
    alias: parse(ast.alias, options, parse),
    fromKeyword: ast.fromKeyword.text,
    path: parse(ast.path, options, parse)
  }),
  // TODO: implement print
  print: () => ['NamedImport']
};
