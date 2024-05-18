export const Expression = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    variant:
      ast.variant.type === 'Token'
        ? ast.variant.text
        : parse(ast.variant, options, parse)
  }),
  print: ({ node, path, print }) =>
    typeof node.variant === 'string'
      ? node.variant
      : path.call(print, 'variant')
};
