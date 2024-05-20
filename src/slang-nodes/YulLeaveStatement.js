export const YulLeaveStatement = {
  parse: ({ ast }) => ({
    kind: ast.cst.kind,
    leaveKeyword: ast.leaveKeyword.text
  }),
  // TODO: implement print
  print: () => ['TODO: YulLeaveStatement']
};
