export const PathImport = {
  parse: ({ ast, options, parse }) => ({
    path: parse(ast.path, options, parse),
    alias: ast.alias ? parse(ast.alias, options, parse) : undefined
  }),
  print: ({ node, path, print }) => [
    path.call(print, 'path'),
    node.alias ? path.call(print, 'alias') : ''
  ]
};
