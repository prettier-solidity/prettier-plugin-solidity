export const YulIfStatement = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    ifKeyword: ast.ifKeyword.text,
    condition: parse(ast.condition, options, parse),
    body: parse(ast.body, options, parse)
  }),
  print: ({ node, path, print }) => [
    node.ifKeyword,
    ' ',
    path.call(print, 'condition'),
    ' ',
    path.call(print, 'body')
  ]
};
