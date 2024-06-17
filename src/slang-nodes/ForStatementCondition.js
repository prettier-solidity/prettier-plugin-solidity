export const ForStatementCondition = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
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
