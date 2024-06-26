export const TupleExpression = {
  parse: ({ offsets, ast, options, parse }) => ({
    openParen: ast.openParen.text,
    items: parse(ast.items, options, parse, offsets),
    closeParen: ast.closeParen.text
  }),
  print: ({ node, path, print }) => [
    node.openParen,
    path.call(print, 'items'),
    node.closeParen
  ]
};
