export const YulBreakStatement = {
  parse: ({ ast }) => ({
    kind: ast.cst.kind,
    breakKeyword: ast.breakKeyword.text
  }),
  print: ({node}) => node.breakKeyword
};
