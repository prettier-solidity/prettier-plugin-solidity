export const YulFunctionDefinition = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    functionKeyword: ast.functionKeyword.text,
    name: ast.name.text,
    parameters: parse(ast.parameters, options, parse, offsets),
    returns: ast.returns
      ? parse(ast.returns, options, parse, offsets)
      : undefined,
    body: parse(ast.body, options, parse, offsets)
  }),
  print: ({ node, path, print }) => [
    node.functionKeyword,
    ' ',
    node.name,
    path.call(print, 'parameters'),
    node.returns ? path.call(print, 'returns') : ' ',
    path.call(print, 'body')
  ]
};
