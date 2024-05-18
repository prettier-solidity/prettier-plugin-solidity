export const ArgumentsDeclaration = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    variant: parse(ast.variant, options, parse)
  }),
  // TODO: implement print
  print: ({ path, print }) => path.call(print, 'variant')
};
