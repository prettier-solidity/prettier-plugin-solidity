export const YulBreakStatement = {
  parse: ({ ast }) => ({
    kind: ast.cst.kind,
    breakKeyword: ast.breakKeyword.text
  }),
  // TODO: implement print
  print: () => ['YulBreakStatement']
};
