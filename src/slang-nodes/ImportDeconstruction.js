export const ImportDeconstruction = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    openBrace: ast.openBrace.text,
    symbols: parse(ast.symbols, options, parse),
    closeBrace: ast.closeBrace.text,
    fromKeyword: ast.fromKeyword.text,
    path: parse(ast.path, options, parse)
  }),
  print: ({ node, path, print }) => [
    node.openBrace,
    path.call(print, 'symbols'),
    `${node.closeBrace} ${node.fromKeyword} `,
    path.call(print, 'path')
  ]
};
