export const ContinueStatement = {
  parse: ({ ast }) => ({
    continueKeyword: ast.continueKeyword.text,
    semicolon: ast.semicolon.text
  }),
  print: ({ node }) => `${node.continueKeyword}${node.semicolon}`
};
