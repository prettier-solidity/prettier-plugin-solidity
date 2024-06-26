export const YulBuiltInFunction = {
  parse: ({ ast }) => ({
    variant: ast.variant.text
  }),
  print: ({ node }) => node.variant
};
