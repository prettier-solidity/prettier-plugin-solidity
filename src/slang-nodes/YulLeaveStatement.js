export const YulLeaveStatement = {
  parse: ({ node, offsets, ast }) => ({
    ...node,
    leaveKeyword: ast.leaveKeyword.text
  }),
  // TODO: implement print
  print: ({ node, path, print, options }) => ['TODO: YulLeaveStatement']
};
