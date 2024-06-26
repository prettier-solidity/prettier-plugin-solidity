export const FunctionName = {
  parse: ({ ast }) => ({
    variant: ast.variant.text
  }),
  print: ({ node }) => node.variant
};
