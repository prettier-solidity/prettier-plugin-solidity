export const FunctionTypeAttributes = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    items: ast.items.map((item) => parse(item, options, parse))
  }),
  // TODO: implement print
  print: ({ node, path, print, options }) => ['TODO: FunctionTypeAttributes']
};
