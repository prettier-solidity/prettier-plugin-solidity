export const MappingKeyType = {
  parse: ({ offsets, ast, options, parse }) => ({
    variant: parse(ast.variant, options, parse, offsets)
  }),
  print: ({ path, print }) => path.call(print, 'variant')
};
