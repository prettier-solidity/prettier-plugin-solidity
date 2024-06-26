export const Block = {
  parse: ({ offsets, ast, options, parse }) => ({
    openBrace: ast.openBrace.text,
    statements: parse(ast.statements, options, parse, offsets),
    closeBrace: ast.closeBrace.text
  }),
  print: ({ node, path, print }) => [
    node.openBrace,
    path.call(print, 'statements'),
    node.closeBrace
  ]
};
