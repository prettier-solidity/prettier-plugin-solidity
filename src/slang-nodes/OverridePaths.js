export const OverridePaths = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    items: ast.items.map((item) => parse(item, options, parse, offsets)),
    separators: ast.separators.map((separator) => separator)
  }),
  // TODO: implement print
  print: ({ node, path, print, options }) => ['TODO: OverridePaths']
};
