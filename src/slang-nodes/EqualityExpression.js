export const EqualityExpression = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    leftOperand: parse(ast.leftOperand, options, parse),
    operator: ast.operator.text,
    rightOperand: parse(ast.rightOperand, options, parse)
  }),
  // TODO: implement print
  print: () => ['TODO: EqualityExpression']
};