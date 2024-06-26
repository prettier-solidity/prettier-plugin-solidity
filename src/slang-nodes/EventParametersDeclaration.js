export const EventParametersDeclaration = {
  parse: ({ offsets, ast, options, parse }) => ({
    openParen: ast.openParen.text,
    parameters: parse(ast.parameters, options, parse, offsets),
    closeParen: ast.closeParen.text
  }),
  print: ({ node, path, print }) => [
    node.openParen,
    path.call(print, 'parameters'),
    node.closeParen
  ]
};
