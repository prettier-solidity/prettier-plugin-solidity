export const UsingAlias = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    asKeyword: ast.asKeyword.text,
    operator: parse(ast.operator, options, parse, offsets)
  }),
  print: ({ node, path, print }) => [
    ` ${node.asKeyword} `,
    path.call(print, 'operator')
  ]
};
