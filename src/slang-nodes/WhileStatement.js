export const WhileStatement = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    whileKeyword: ast.whileKeyword.text,
    openParen: ast.openParen.text,
    condition: parse(ast.condition, options, parse, offsets),
    closeParen: ast.closeParen.text,
    body: parse(ast.body, options, parse, offsets)
  }),
  print: ({ node, path, print }) => [
    node.whileKeyword,
    node.openParen,
    path.call(print, 'condition'),
    node.closeParen,
    path.call(print, 'body')
  ]
};
