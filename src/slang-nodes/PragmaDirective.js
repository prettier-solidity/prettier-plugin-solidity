export const PragmaDirective = {
  parse: ({ offsets, ast, options, parse }) => ({
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
