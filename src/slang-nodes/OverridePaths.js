export const OverridePaths = {
  parse: ({ offsets, ast, options, parse }) => ({
    items: ast.items.map((item) => parse(item, options, parse, offsets)),
    separators: ast.separators.map((separator) => separator)
  }),
  // TODO: implement print
  print: ({ node, path, print, options }) => ['TODO: OverridePaths']
};
