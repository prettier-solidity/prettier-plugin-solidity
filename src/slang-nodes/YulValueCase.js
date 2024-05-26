export const YulValueCase = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    caseKeyword: ast.caseKeyword.text,
    value: parse(ast.value, options, parse),
    body: parse(ast.body, options, parse)
  }),
  print: ({ node, path, print }) => [
    `${node.caseKeyword} `,
    path.call(print, 'value'),
    ' ',
    path.call(print, 'body')
  ]
};
