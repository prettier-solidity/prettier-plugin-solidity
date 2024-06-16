export const ContinueStatement = {
  parse: ({ ast }) => ({
    kind: ast.cst.kind,
    continueKeyword: ast.continueKeyword.text,
    semicolon: ast.semicolon.text
  }),
  print: ({ node }) => `${node.continueKeyword}${node.semicolon}`
};
