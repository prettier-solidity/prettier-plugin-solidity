export const YulParameters = {
  parse: ({ ast }) => ({
    kind: ast.cst.kind,
    items: ast.items.map((item) => item.text),
    separators: ast.separators.map((separator) => separator.text)
  }),
  // TODO: implement print
  print: () => ['TODO: YulParameters']
};
