export const InheritanceType = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
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
