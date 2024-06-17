export const YulIfStatement = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    ifKeyword: ast.ifKeyword.text,
    condition: parse(ast.condition, options, parse, offsets),
    body: parse(ast.body, options, parse, offsets)
  }),
  print: ({ node, path, print }) => [
    node.ifKeyword,
    ' ',
    path.call(print, 'condition'),
    ' ',
    path.call(print, 'body')
  ]
};
