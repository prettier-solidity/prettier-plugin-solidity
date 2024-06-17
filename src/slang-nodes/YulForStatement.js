export const YulForStatement = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    forKeyword: ast.forKeyword.text,
    initialization: parse(ast.initialization, options, parse, offsets),
    condition: parse(ast.condition, options, parse, offsets),
    iterator: parse(ast.iterator, options, parse, offsets),
    body: parse(ast.body, options, parse, offsets)
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
