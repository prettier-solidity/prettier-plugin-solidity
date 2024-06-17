export const NamedArgumentsDeclaration = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    openParen: ast.openParen.text,
    arguments: ast.arguments
      ? parse(ast.arguments, options, parse, offsets)
      : undefined,
    closeParen: ast.closeParen.text
  }),
  print: ({ node, path, print }) => [
    node.openParen,
    node.arguments ? path.call(print, 'arguments') : '',
    node.closeParen
  ]
};
