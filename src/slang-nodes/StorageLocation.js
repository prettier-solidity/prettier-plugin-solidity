export const StorageLocation = {
  parse: ({ node, ast }) => ({
    ...node,
    variant: ast.variant.text
  }),
  print: ({ node }) => node.variant
};
