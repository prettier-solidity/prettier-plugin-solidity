export const YulPathComponent = {
  parse: ({ ast }) => ({
    variant: ast.variant.text
  }),
  print: ({ node }) => node.variant
};
