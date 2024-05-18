export const OverridePaths = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    items: ast.items.map((item) => parse(item, options, parse)),
    separators: ast.separators.map((separator) => separator)
  }),
  // TODO: implement print
  print: () => ['OverridePaths']
};
