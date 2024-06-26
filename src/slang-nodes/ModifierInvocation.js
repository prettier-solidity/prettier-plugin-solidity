export const ModifierInvocation = {
  parse: ({ offsets, ast, options, parse }) => ({
    name: parse(ast.name, options, parse, offsets),
    arguments: ast.arguments
      ? parse(ast.arguments, options, parse, offsets)
      : undefined
  }),
  print: ({ node, path, print }) => [
    path.call(print, 'name'),
    node.arguments ? path.call(print, 'arguments') : ''
  ]
};
