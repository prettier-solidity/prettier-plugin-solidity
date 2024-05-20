export const ThrowStatement = {
  parse: ({ ast }) => ({
    kind: ast.cst.kind,
    throwKeyword: ast.throwKeyword.text,
    semicolon: ast.semicolon.text
  }),
  // TODO: implement print
  print: () => ['TODO: ThrowStatement']
};
