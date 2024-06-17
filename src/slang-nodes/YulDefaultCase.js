export const YulDefaultCase = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    defaultKeyword: ast.defaultKeyword.text,
    body: parse(ast.body, options, parse, offsets)
  }),
  print: ({ node, path, print }) => [
    `${node.defaultKeyword} `,
    path.call(print, 'body')
  ]
};
