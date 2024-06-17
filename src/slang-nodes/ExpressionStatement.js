export const ExpressionStatement = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    expression: parse(ast.expression, options, parse, offsets),
    semicolon: ast.semicolon.text
  }),
  print: ({ node, path, print }) => [
    path.call(print, 'expression'),
    node.semicolon
  ]
};
