export const UsingOperator = {
  parse: ({ node, offsets, ast }) => ({
    ...node,
    variant: ast.variant.text
  }),
  print: ({ node }) => node.variant
};
