export const Block = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    openBrace: ast.openBrace.text,
    statements: parse(ast.statements, options, parse),
    closeBrace: ast.closeBrace.text
  }),
  // TODO: implement print
  print: () => ['Block']
};
