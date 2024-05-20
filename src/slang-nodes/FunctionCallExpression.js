export const FunctionCallExpression = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    operand: parse(ast.operand, options, parse),
    arguments: parse(ast.arguments, options, parse)
  }),
  print: ({ path, print }) => [
    path.call(print, 'operand'),
    path.call(print, 'arguments')
  ]
};