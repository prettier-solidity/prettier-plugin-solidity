export const DoWhileStatement = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    doKeyword: ast.doKeyword.text,
    body: parse(ast.body, options, parse),
    whileKeyword: ast.whileKeyword.text,
    openParen: ast.openParen.text,
    condition: parse(ast.condition, options, parse),
    closeParen: ast.closeParen.text,
    semicolon: ast.semicolon.text
  }),
  // TODO: implement print
  print: () => ['TODO: DoWhileStatement']
};
