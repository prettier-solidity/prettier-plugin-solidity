export const PragmaDirective = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    pragmaKeyword: ast.pragmaKeyword.text,
    pragma: parse(ast.pragma, options, parse, offsets),
    semicolon: ast.semicolon.text
  }),
  print: ({ node, path, print }) => [
    node.pragmaKeyword,
    ' ',
    path.call(print, 'pragma'),
    node.semicolon
  ]
};
