export const YulContinueStatement = {
  parse: ({ ast }) => ({
    continueKeyword: ast.continueKeyword.text
  }),
  print: ({ node }) => node.continueKeyword
};
