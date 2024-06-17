export const YulFunctionCallExpression = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    operand: parse(ast.operand, options, parse, offsets),
    openParen: ast.openParen.text,
    arguments: parse(ast.arguments, options, parse, offsets),
    closeParen: ast.closeParen.text
  }),
  print: ({ node, path, print }) => [
    path.call(print, 'operand'),
    node.openParen,
    path.call(print, 'arguments'),
    node.closeParen
  ]
};
