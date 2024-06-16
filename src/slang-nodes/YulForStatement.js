export const YulForStatement = {
  parse: ({ ast, options, parse }) => ({
    forKeyword: ast.forKeyword.text,
    initialization: parse(ast.initialization, options, parse),
    condition: parse(ast.condition, options, parse),
    iterator: parse(ast.iterator, options, parse),
    body: parse(ast.body, options, parse)
  }),
  print: ({ node, path, print }) => [
    node.forKeyword,
    ' ',
    path.call(print, 'initialization'),
    ' ',
    path.call(print, 'condition'),
    ' ',
    path.call(print, 'iterator'),
    ' ',
    path.call(print, 'body')
  ]
};
