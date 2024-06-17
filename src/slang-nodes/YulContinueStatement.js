export const YulContinueStatement = {
  parse: ({ node, ast }) => ({
    ...node,
    continueKeyword: ast.continueKeyword.text
  }),
  print: ({ node }) => node.continueKeyword
};
