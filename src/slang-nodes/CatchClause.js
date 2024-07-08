export const CatchClause = {
  parse: ({ offsets, ast, options, parse }) => ({
    catchKeyword: ast.catchKeyword.text,
    error: ast.error ? parse(ast.error, options, parse, offsets) : undefined,
    body: parse(ast.body, options, parse, offsets)
  }),
  print: ({ node, path, print }) => [
    `${node.catchKeyword} `,
    node.error ? path.call(print, 'error') : '',
    path.call(print, 'body')
  ]
};
