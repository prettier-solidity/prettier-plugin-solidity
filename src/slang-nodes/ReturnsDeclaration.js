export const ReturnsDeclaration = {
  parse: ({ offsets, ast, options, parse }) => ({
    returnsKeyword: ast.returnsKeyword.text,
    variables: parse(ast.variables, options, parse, offsets)
  }),
  print: ({ node, path, print }) => [
    `${node.returnsKeyword} `,
    path.call(print, 'variables')
  ]
};
