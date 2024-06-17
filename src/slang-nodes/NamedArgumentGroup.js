export const NamedArgumentGroup = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    openBrace: ast.openBrace.text,
    arguments: parse(ast.arguments, options, parse, offsets),
    closeBrace: ast.closeBrace.text
  }),
  print: ({ node, path, print }) => [
    node.openBrace,
    path.call(print, 'arguments'),
    node.closeBrace
  ]
};
