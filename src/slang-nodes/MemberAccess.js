export const MemberAccess = {
  parse: ({ node, ast }) => ({
    ...node,
    variant: ast.variant.text
  }),
  print: ({ node }) => node.variant
};
