export const NamedArgumentGroup = {
  parse: ({ offsets, ast, options, parse }) => ({
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
