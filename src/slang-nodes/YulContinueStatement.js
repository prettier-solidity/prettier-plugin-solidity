export const YulContinueStatement = {
  parse: ({ node, offsets, ast }) => ({
    ...node,
    continueKeyword: ast.continueKeyword.text
  }),
  print: ({ node }) => node.continueKeyword
};
