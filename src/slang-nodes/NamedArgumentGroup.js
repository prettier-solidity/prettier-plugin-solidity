export const NamedArgumentGroup = {
  parse: ({ ast, options, parse }) => ({
    openBrace: ast.openBrace.text,
    arguments: parse(ast.arguments, options, parse),
    closeBrace: ast.closeBrace.text
  }),
  print: ({ node, path, print }) => [
    node.openBrace,
    path.call(print, 'arguments'),
    node.closeBrace
  ]
};
