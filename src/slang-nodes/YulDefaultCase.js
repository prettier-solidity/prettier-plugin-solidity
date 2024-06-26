export const YulDefaultCase = {
  parse: ({ offsets, ast, options, parse }) => ({
    defaultKeyword: ast.defaultKeyword.text,
    body: parse(ast.body, options, parse, offsets)
  }),
  print: ({ node, path, print }) => [
    `${node.defaultKeyword} `,
    path.call(print, 'body')
  ]
};
