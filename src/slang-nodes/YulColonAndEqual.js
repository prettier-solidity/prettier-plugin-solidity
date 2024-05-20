export const YulColonAndEqual = {
  parse: ({ ast }) => ({
    kind: ast.cst.kind,
    colon: ast.colon.text,
    equal: ast.equal.text
  }),
  // TODO: implement print
  print: () => ['TODO: YulColonAndEqual']
};
