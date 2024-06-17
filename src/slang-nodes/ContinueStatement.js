export const ContinueStatement = {
  parse: ({ node, ast }) => ({
    ...node,
    continueKeyword: ast.continueKeyword.text,
    semicolon: ast.semicolon.text
  }),
  print: ({ node }) => `${node.continueKeyword}${node.semicolon}`
};
