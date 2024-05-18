export const ContinueStatement = {
  parse: ({ ast }) => ({
    kind: ast.cst.kind,
    continueKeyword: ast.continueKeyword.text,
    semicolon: ast.semicolon.text
  }),
  // TODO: implement print
  print: () => ['ContinueStatement']
};
