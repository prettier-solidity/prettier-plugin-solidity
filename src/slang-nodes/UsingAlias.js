export const UsingAlias = {
  parse: ({ offsets, ast, options, parse }) => ({
    asKeyword: ast.asKeyword.text,
    operator: parse(ast.operator, options, parse, offsets)
  }),
  print: ({ node, path, print }) => [
    ` ${node.asKeyword} `,
    path.call(print, 'operator')
  ]
};
