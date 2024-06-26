export const YulArguments = {
  parse: ({ offsets, ast, options, parse }) => ({
    items: ast.items.map((item) => parse(item, options, parse, offsets)),
    separators: ast.separators.map((separator) => separator.text)
  }),
  print: ({ node, path, print }) =>
    path
      .map(print, 'items')
      .map((item, index) =>
        index === 0 ? item : [node.separators[index - 1], item]
      )
};
