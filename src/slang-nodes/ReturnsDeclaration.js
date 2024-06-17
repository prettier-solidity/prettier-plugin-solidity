export const ReturnsDeclaration = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    returnsKeyword: ast.returnsKeyword.text,
    variables: parse(ast.variables, options, parse, offsets)
  }),
  print: ({ node, path, print }) => [
    `${node.returnsKeyword} `,
    path.call(print, 'variables')
  ]
};
