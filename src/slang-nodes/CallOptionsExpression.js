export const CallOptionsExpression = {
  parse: ({ offsets, ast, options, parse }) => ({
    operand: parse(ast.operand, options, parse, offsets),
    openBrace: ast.openBrace.text,
    options: parse(ast.options, options, parse, offsets),
    closeBrace: ast.closeBrace.text
  }),
  print: ({ node, path, print }) => [
    path.call(print, 'operand'),
    node.openBrace,
    path.call(print, 'options'),
    node.closeBrace
  ]
};
