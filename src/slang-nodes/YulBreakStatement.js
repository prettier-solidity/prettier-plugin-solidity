export const YulBreakStatement = {
  parse: ({ ast }) => ({
    breakKeyword: ast.breakKeyword.text
  }),
  print: ({ node }) => node.breakKeyword
};
