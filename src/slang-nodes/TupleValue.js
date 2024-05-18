export const TupleValue = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    expression: ast.expression
      ? parse(ast.expression, options, parse)
      : undefined
  }),
  // TODO: implement print
  print: () => ['TupleValue']
};
