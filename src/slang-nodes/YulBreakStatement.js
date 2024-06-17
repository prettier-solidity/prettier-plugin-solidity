export const YulBreakStatement = {
  parse: ({ node, ast }) => ({
    ...node,
    breakKeyword: ast.breakKeyword.text
  }),
  print: ({ node }) => node.breakKeyword
};
