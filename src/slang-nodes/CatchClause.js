export const CatchClause = {
  parse: ({ ast, options, parse }) => ({
    catchKeyword: ast.catchKeyword.text,
    error: ast.error ? parse(ast.error, options, parse) : undefined,
    body: parse(ast.body, options, parse)
  }),
  print: ({ node, path, print }) => [
    node.catchKeyword,
    node.error ? [' ', path.call(print, 'error')] : '',
    path.call(print, 'body')
  ]
};
