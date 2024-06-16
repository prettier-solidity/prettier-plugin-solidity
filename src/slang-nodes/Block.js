export const Block = {
  parse: ({ ast, options, parse }) => ({
    openBrace: ast.openBrace.text,
    statements: parse(ast.statements, options, parse),
    closeBrace: ast.closeBrace.text
  }),
  print: ({ node, path, print }) => [
    node.openBrace,
    path.call(print, 'statements'),
    node.closeBrace
  ]
};
