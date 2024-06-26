export const PositionalArgumentsDeclaration = {
  parse: ({ offsets, ast, options, parse }) => ({
    openParen: ast.openParen.text,
    arguments: parse(ast.arguments, options, parse, offsets),
    closeParen: ast.closeParen.text
  }),
  print: ({ node, path, print }) => [
    node.openParen,
    path.call(print, 'arguments'),
    node.closeParen
  ]
};
