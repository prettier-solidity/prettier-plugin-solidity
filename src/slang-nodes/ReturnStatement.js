export const ReturnStatement = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    returnKeyword: ast.returnKeyword.text,
    expression: ast.expression
      ? parse(ast.expression, options, parse, offsets)
      : undefined,
    semicolon: ast.semicolon.text
  }),
  print: ({ node, path, print }) => [
    node.returnKeyword,
    node.expression ? [' ', path.call(print, 'expression')] : '',
    node.semicolon
  ]
};
