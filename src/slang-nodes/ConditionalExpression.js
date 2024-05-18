export const ConditionalExpression = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    operand: parse(ast.operand, options, parse),
    questionMark: ast.questionMark.text,
    trueExpression: parse(ast.trueExpression, options, parse),
    colon: ast.colon.text,
    falseExpression: parse(ast.falseExpression, options, parse)
  }),
  // TODO: implement print
  print: () => ['ConditionalExpression']
};
