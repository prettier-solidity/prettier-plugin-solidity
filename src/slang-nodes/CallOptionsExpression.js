export const CallOptionsExpression = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    operand: parse(ast.operand, options, parse),
    openBrace: ast.openBrace.text,
    options: parse(ast.options, options, parse),
    closeBrace: ast.closeBrace.text
  }),
  // TODO: implement print
  print: () => ['TODO: CallOptionsExpression']
};
