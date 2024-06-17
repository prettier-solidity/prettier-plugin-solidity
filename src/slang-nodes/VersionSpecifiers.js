export const VersionSpecifiers = {
  parse: ({ node, offsets, ast }) => ({
    ...node,
    items: ast.items.map((item) => item.text),
    separators: ast.separators.map((separator) => separator.text)
  }),
  print: ({ node }) =>
    node.items.map((item, index) =>
      index === 0 ? item : [node.separators[index - 1], item]
    )
};
