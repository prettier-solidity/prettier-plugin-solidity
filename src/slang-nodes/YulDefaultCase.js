export const YulDefaultCase = {
  parse: ({ ast, options, parse }) => ({
    defaultKeyword: ast.defaultKeyword.text,
    body: parse(ast.body, options, parse)
  }),
  print: ({ node, path, print }) => [
    `${node.defaultKeyword} `,
    path.call(print, 'body')
  ]
};
