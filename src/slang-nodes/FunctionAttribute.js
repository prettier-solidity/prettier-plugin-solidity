export const FunctionAttribute = {
  parse: ({ ast, options, parse }) => ({
    variant:
      ast.variant.type === 'Terminal'
        ? ast.variant.text
        : parse(ast.variant, options, parse)
  }),
  print: ({ node, path, print }) =>
    typeof node.variant === 'string'
      ? node.variant
      : path.call(print, 'variant')
};
