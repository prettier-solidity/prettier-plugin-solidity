export const NewExpression = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    newKeyword: ast.newKeyword.text,
    typeName: parse(ast.typeName, options, parse, offsets)
  }),
  print: ({ node, path, print }) => [
    `${node.newKeyword} `,
    path.call(print, 'typeName')
  ]
};
