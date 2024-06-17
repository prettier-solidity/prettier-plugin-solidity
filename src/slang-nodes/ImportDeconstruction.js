export const ImportDeconstruction = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    openBrace: ast.openBrace.text,
    symbols: parse(ast.symbols, options, parse, offsets),
    closeBrace: ast.closeBrace.text,
    fromKeyword: ast.fromKeyword.text,
    path: parse(ast.path, options, parse, offsets)
  }),
  print: ({ node, path, print }) => [
    node.openBrace,
    path.call(print, 'symbols'),
    `${node.closeBrace} ${node.fromKeyword} `,
    path.call(print, 'path')
  ]
};
