export const StorageLocation = {
  parse: ({ node, offsets, ast }) => ({
    ...node,
    variant: ast.variant.text
  }),
  print: ({ node }) => node.variant
};
