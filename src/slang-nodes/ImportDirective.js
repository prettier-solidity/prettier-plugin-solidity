export const ImportDirective = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    importKeyword: ast.importKeyword.text,
    clause: parse(ast.clause, options, parse),
    semicolon: ast.semicolon.text
  }),
  // TODO: implement print
  print: () => ['ImportDirective']
};
