export const YulFunctionDefinition = {
  parse: ({ ast, options, parse }) => ({
    functionKeyword: ast.functionKeyword.text,
    name: ast.name.text,
    parameters: parse(ast.parameters, options, parse),
    returns: ast.returns ? parse(ast.returns, options, parse) : undefined,
    body: parse(ast.body, options, parse)
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
