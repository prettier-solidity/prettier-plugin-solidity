export const YulFunctionCallExpression = {
  parse: ({ ast, options, parse }) => ({
    operand: parse(ast.operand, options, parse),
    openParen: ast.openParen.text,
    arguments: parse(ast.arguments, options, parse),
    closeParen: ast.closeParen.text
  }),
  print: ({ node, path, print }) => [
    path.call(print, 'operand'),
    node.openParen,
    path.call(print, 'arguments'),
    node.closeParen
  ]
};
