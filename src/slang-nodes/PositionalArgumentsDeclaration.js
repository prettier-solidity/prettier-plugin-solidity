export const PositionalArgumentsDeclaration = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
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
