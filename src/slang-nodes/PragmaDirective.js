export const PragmaDirective = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    pragmaKeyword: ast.pragmaKeyword.text,
    pragma: parse(ast.pragma, options, parse),
    semicolon: ast.semicolon.text
  }),
  print: ({ node, path, print }) => [
    node.pragmaKeyword,
    ' ',
    path.call(print, 'pragma'),
    node.semicolon
  ]
};
