export const ImportDeconstruction = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    openBrace: ast.openBrace.text,
    symbols: parse(ast.symbols, options, parse),
    closeBrace: ast.closeBrace.text,
    fromKeyword: ast.fromKeyword.text,
    path: parse(ast.path, options, parse)
  }),
  // TODO: implement print
  print: () => ['ImportDeconstruction']
};
