export const NewExpression = {
  parse: ({ ast, options, parse }) => ({
    newKeyword: ast.newKeyword.text,
    typeName: parse(ast.typeName, options, parse)
  }),
  print: ({ node, path, print }) => [
    `${node.newKeyword} `,
    path.call(print, 'typeName')
  ]
};
