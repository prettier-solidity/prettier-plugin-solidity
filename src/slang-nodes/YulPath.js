export const YulPath = {
  parse: ({ ast, options, parse }) => ({
    items: ast.items.map((item) => parse(item, options, parse)),
    separators: ast.separators.map((separator) => separator.text)
  }),
  print: ({ node, path, print }) =>
    path
      .map(print, 'items')
      .map((item, index) =>
        index === 0 ? item : [node.separators[index - 1], item]
      )
};
