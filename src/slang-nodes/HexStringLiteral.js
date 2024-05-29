export const HexStringLiteral = {
  parse: ({ ast, options }) => ({
    kind: ast.cst.kind,
    variant: options.singleQuote
      ? `hex'${ast.variant.text.slice(4, -1)}'`
      : `hex"${ast.variant.text.slice(4, -1)}"`
  }),
  print: ({ node }) => node.variant
};
