export const ExpressionStatement = {
  parse: ({ offsets, ast, options, parse }) => ({
    expression: parse(ast.expression, options, parse, offsets),
    semicolon: ast.semicolon.text
  }),
  print: ({ node, path, print }) => [
    path.call(print, 'expression'),
    node.semicolon
  ]
};
