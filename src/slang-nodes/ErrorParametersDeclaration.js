export const ErrorParametersDeclaration = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    openParen: ast.openParen.text,
    parameters: parse(ast.parameters, options, parse),
    closeParen: ast.closeParen.text
  }),
  print: ({ node, path, print }) => [
    node.openParen,
    path.call(print, 'parameters'),
    node.closeParen
  ]
};
