export const YulContinueStatement = {
  parse: ({ ast }) => ({
    kind: ast.cst.kind,
    continueKeyword: ast.continueKeyword.text
  }),
  print: ({node}) => node.continueKeyword
};
