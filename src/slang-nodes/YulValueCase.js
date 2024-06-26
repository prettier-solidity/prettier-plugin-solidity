export const YulValueCase = {
  parse: ({ offsets, ast, options, parse }) => ({
    caseKeyword: ast.caseKeyword.text,
    value: parse(ast.value, options, parse, offsets),
    body: parse(ast.body, options, parse, offsets)
  }),
  print: ({ node, path, print }) => [
    `${node.caseKeyword} `,
    path.call(print, 'value'),
    ' ',
    path.call(print, 'body')
  ]
};
