export const YulBreakStatement = {
  parse: ({ node, offsets, ast }) => ({
    ...node,
    breakKeyword: ast.breakKeyword.text
  }),
  print: ({ node }) => node.breakKeyword
};
