export const UsingDirective = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    usingKeyword: ast.usingKeyword.text,
    clause: parse(ast.clause, options, parse),
    forKeyword: ast.forKeyword.text,
    target: parse(ast.target, options, parse),
    globalKeyword: ast.globalKeyword?.text,
    semicolon: ast.semicolon.text
  }),
  // TODO: implement print
  print: () => ['TODO: UsingDirective']
};
