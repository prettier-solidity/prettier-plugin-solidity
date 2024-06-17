export const UsingDeconstruction = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    openBrace: ast.openBrace.text,
    symbols: parse(ast.symbols, options, parse, offsets),
    closeBrace: ast.closeBrace.text
  }),
  print: ({ node, path, print }) => [
    node.openBrace,
    path.call(print, 'symbols'),
    node.closeBrace
  ]
};
