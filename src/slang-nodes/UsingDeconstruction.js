export const UsingDeconstruction = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    openBrace: ast.openBrace.text,
    symbols: parse(ast.symbols, options, parse),
    closeBrace: ast.closeBrace.text
  }),
  print: ({ node, path, print }) => [
    node.openBrace,
    path.call(print, 'symbols'),
    node.closeBrace
  ]
};
