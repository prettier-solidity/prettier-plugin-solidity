export const PositionalArguments = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    items: ast.items.map((item) => parse(item, options, parse)),
    separators: ast.separators.map((separator) => separator.text)
  }),
  print: ({ path, print }) => path.map(print, 'items')
};