export const NamedArgumentsDeclaration = {
  parse: ({ ast, options, parse }) => ({
    openParen: ast.openParen.text,
    arguments: ast.arguments ? parse(ast.arguments, options, parse) : undefined,
    closeParen: ast.closeParen.text
  }),
  print: ({ node, path, print }) => [
    node.openParen,
    node.arguments ? path.call(print, 'arguments') : '',
    node.closeParen
  ]
};
