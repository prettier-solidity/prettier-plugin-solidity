export const BreakStatement = {
  parse: ({ ast }) => ({
    breakKeyword: ast.breakKeyword.text,
    semicolon: ast.semicolon.text
  }),
  print: ({ node }) => `${node.breakKeyword}${node.semicolon}`
};
