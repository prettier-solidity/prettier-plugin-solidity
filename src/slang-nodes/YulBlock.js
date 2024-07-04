export const YulBlock = {
  parse: ({ offsets, ast, options, parse }) => ({
    openBrace: ast.openBrace.text,
    statements: parse(ast.statements, options, parse, offsets),
    closeBrace: ast.closeBrace.text
  }),
  print: ({ node, print }) => [
    node.openBrace,
    print.call(print, 'statements'),
    node.closeBrace
  ]
};
