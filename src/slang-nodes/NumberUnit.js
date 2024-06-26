export const NumberUnit = {
  parse: ({ ast }) => ({
    variant: ast.variant.text
  }),
  print: ({ node }) => node.variant
};
