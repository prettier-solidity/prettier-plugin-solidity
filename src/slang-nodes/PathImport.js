export const PathImport = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    path: parse(ast.path, options, parse, offsets),
    alias: ast.alias ? parse(ast.alias, options, parse, offsets) : undefined
  }),
  print: ({ node, path, print }) => [
    path.call(print, 'path'),
    node.alias ? path.call(print, 'alias') : ''
  ]
};
