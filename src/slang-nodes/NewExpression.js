export const NewExpression = {
  parse: ({ offsets, ast, options, parse }) => ({
    newKeyword: ast.newKeyword.text,
    typeName: parse(ast.typeName, options, parse, offsets)
  }),
  print: ({ node, path, print }) => [
    `${node.newKeyword} `,
    path.call(print, 'typeName')
  ]
};
