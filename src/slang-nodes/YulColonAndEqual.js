export const YulColonAndEqual = {
  parse: ({ node, ast }) => ({
    ...node,
    colon: ast.colon.text,
    equal: ast.equal.text
  }),
  // TODO: implement print
  print: ({ node, path, print, options }) => ['TODO: YulColonAndEqual']
};
