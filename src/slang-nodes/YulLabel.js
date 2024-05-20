export const YulLabel = {
  parse: ({ ast }) => ({
    kind: ast.cst.kind,
    label: ast.label.text,
    colon: ast.colon.text
  }),
  // TODO: implement print
  print: () => ['TODO: YulLabel']
};
