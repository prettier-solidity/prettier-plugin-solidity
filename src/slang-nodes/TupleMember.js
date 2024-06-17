export const TupleMember = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    variant: parse(ast.variant, options, parse, offsets)
  }),
  print: ({ path, print }) => path.call(print, 'variant')
};
