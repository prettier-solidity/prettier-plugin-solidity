export const BreakStatement = {
  parse: ({ node, ast }) => ({
    ...node,
    breakKeyword: ast.breakKeyword.text,
    semicolon: ast.semicolon.text
  }),
  print: ({ node }) => `${node.breakKeyword}${node.semicolon}`
};
