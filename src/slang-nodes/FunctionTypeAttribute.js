export const FunctionTypeAttribute = {
  parse: ({ ast }) => ({
    kind: ast.cst.kind,
    variant: ast.variant.text
  }),
  print: ({ node }) => node.variant
};
