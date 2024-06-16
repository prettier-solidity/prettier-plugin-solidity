export const StorageLocation = {
  parse: ({ ast }) => ({
    variant: ast.variant.text
  }),
  print: ({ node }) => node.variant
};
