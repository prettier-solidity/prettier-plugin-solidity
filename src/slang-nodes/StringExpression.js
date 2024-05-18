export const StringExpression = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    variant: parse(ast.variant, options, parse)
  }),
  print: ({ path, print }) => path.call(print, 'variant')
};
