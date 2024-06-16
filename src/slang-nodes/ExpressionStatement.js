export const ExpressionStatement = {
  parse: ({ ast, options, parse }) => ({
    expression: parse(ast.expression, options, parse),
    semicolon: ast.semicolon.text
  }),
  print: ({ node, path, print }) => [
    path.call(print, 'expression'),
    node.semicolon
  ]
};
