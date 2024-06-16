export const CallOptionsExpression = {
  parse: ({ ast, options, parse }) => ({
    operand: parse(ast.operand, options, parse),
    openBrace: ast.openBrace.text,
    options: parse(ast.options, options, parse),
    closeBrace: ast.closeBrace.text
  }),
  print: ({ node, path, print }) => [
    path.call(print, 'operand'),
    node.openBrace,
    path.call(print, 'options'),
    node.closeBrace
  ]
};
