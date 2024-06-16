export const YulColonAndEqual = {
  parse: ({ ast }) => ({
    colon: ast.colon.text,
    equal: ast.equal.text
  }),
  // TODO: implement print
  print: ({ node, path, print, options }) => ['TODO: YulColonAndEqual']
};
