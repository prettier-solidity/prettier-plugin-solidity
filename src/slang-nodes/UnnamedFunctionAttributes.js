export const UnnamedFunctionAttributes = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    items: ast.items.map((item) => parse(item, options, parse))
  }),
  // TODO: implement print
  print: () => ['UnnamedFunctionAttributes']
};
