export const DecimalNumberExpression = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    literal: ast.literal.text,
    unit: ast.unit ? parse(ast.unit, options, parse) : undefined
  }),
  // TODO: implement print
  print: () => ['TODO: DecimalNumberExpression']
};
