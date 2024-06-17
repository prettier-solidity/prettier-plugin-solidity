export const YulColonAndEqual = {
  parse: ({ node, offsets, ast }) => ({
    ...node,
    colon: ast.colon.text,
    equal: ast.equal.text
  }),
  // TODO: implement print
  print: ({ node, path, print, options }) => ['TODO: YulColonAndEqual']
};
