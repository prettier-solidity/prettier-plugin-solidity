export const ErrorParameter = {
  parse: ({ offsets, ast, options, parse }) => ({
    typeName: parse(ast.typeName, options, parse, offsets),
    name: ast.name?.text
  }),
  print: ({ node, path, print }) => [
    path.call(print, 'typeName'),
    node.name ? ` ${node.name}` : ''
  ]
};
