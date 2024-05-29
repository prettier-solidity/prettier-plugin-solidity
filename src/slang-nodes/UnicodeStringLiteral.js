export const UnicodeStringLiteral = {
  parse: ({ ast, options }) => ({
    kind: ast.cst.kind,
    variant: options.singleQuote
      ? `unicode'${ast.variant.text.slice(8, -1)}'`
      : `unicode"${ast.variant.text.slice(8, -1)}"`
  }),
  print: ({ node }) => node.variant
};
