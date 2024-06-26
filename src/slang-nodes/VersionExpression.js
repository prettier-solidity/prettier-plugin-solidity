export const VersionExpression = {
  parse: ({ offsets, ast, options, parse }) => ({
    variant:
      ast.variant.type === 'Terminal'
        ? ast.variant.text
        : parse(ast.variant, options, parse, offsets)
  }),
  print: ({ node, path, print }) =>
    typeof node.variant === 'string'
      ? node.variant
      : path.call(print, 'variant')
};
