export const ErrorParameters = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    items: ast.items.map((item) => parse(item.text, options, parse)),
    separators: ast.separators.map((separator) => separator.text)
  }),
  // TODO: implement print
  print: () => ['TODO: ErrorParameters']
};
