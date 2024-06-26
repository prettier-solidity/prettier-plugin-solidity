export const YulLeaveStatement = {
  parse: ({ ast }) => ({
    leaveKeyword: ast.leaveKeyword.text
  }),
  // TODO: implement print
  print: ({ node, path, print, options }) => ['TODO: YulLeaveStatement']
};
