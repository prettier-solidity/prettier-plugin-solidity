export const InheritanceType = {
  parse: ({ offsets, ast, options, parse }) => ({
    typeName: parse(ast.typeName, options, parse, offsets),
    arguments: ast.arguments
      ? parse(ast.arguments, options, parse, offsets)
      : undefined
  }),
  print: ({ node, path, print }) => [
    path.call(print, 'typeName'),
    node.arguments ? path.call(print, 'arguments') : ''
  ]
};
