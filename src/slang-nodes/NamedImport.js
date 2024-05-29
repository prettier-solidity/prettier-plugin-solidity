export const NamedImport = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    asterisk: ast.asterisk.text,
    alias: parse(ast.alias, options, parse),
    fromKeyword: ast.fromKeyword.text,
    path: parse(ast.path, options, parse)
  }),
  print: ({ node, path, print }) => [
    node.asterisk,
    path.call(print, 'alias'),
    ` ${node.fromKeyword} `,
    path.call(print, 'path')
  ]
};
