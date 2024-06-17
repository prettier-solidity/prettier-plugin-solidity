export const EventParametersDeclaration = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
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
