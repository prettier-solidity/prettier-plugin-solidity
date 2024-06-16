export const UsingClause = {
  parse: ({ ast, options, parse }) => ({
    variant: parse(ast.variant, options, parse)
  }),
  print: ({ path, print }) => path.call(print, 'variant')
};
