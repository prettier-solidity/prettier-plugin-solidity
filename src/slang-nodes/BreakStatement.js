export const BreakStatement = {
  parse: ({ ast }) => ({
    kind: ast.cst.kind,
    breakKeyword: ast.breakKeyword.text,
    semicolon: ast.semicolon.text
  }),
  print: ({ node }) => `${node.breakKeyword}${node.semicolon}`
};
