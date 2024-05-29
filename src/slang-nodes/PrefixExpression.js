export const PrefixExpression = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    operator: ast.operator.text,
    operand: parse(ast.operand, options, parse)
  }),
  // TODO: implement print
  print: ({ node, path, print, options }) => ['TODO: PrefixExpression']
};
