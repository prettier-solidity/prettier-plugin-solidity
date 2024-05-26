export const YulDefaultCase = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    defaultKeyword: ast.defaultKeyword.text,
    body: parse(ast.body, options, parse)
  }),
  print: ({ node, path, print }) => [
    `${node.defaultKeyword} `,
    path.call(print, 'body')
  ]
};
