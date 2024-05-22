export const AssignmentExpression = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    leftOperand: parse(ast.leftOperand, options, parse),
    operator: ast.operator.text,
    rightOperand: parse(ast.rightOperand, options, parse)
  }),
  print: ({ node, path, print }) => [
    path.call(print, 'leftOperand'),
    ` ${node.operator} `,
    path.call(print, 'rightOperand')
  ]
};
