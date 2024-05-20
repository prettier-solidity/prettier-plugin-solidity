export const MemberAccessExpression = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    operand: parse(ast.operand, options, parse),
    period: ast.period.text,
    member: parse(ast.member, options, parse)
  }),
  print: ({ node, path, print }) => [
    path.call(print, 'operand'),
    node.period,
    path.call(print, 'member')
  ]
};
