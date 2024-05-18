export const YulContinueStatement = {
  parse: ({ ast }) => ({
    kind: ast.cst.kind,
    continueKeyword: ast.continueKeyword.text
  }),
  // TODO: implement print
  print: () => ['YulContinueStatement']
};
