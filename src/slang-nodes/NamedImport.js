export const NamedImport = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    asterisk: ast.asterisk.text,
    alias: parse(ast.alias, options, parse, offsets),
    fromKeyword: ast.fromKeyword.text,
    path: parse(ast.path, options, parse, offsets)
  }),
  print: ({ node, path, print }) => [
    node.asterisk,
    path.call(print, 'alias'),
    ` ${node.fromKeyword} `,
    path.call(print, 'path')
  ]
};
