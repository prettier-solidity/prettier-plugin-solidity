export const ReturnsDeclaration = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    returnsKeyword: ast.returnsKeyword.text,
    variables: parse(ast.variables, options, parse)
  }),
  print: ({ node, path, print }) => [
    node.returnsKeyword,
    path.call(print, 'variables')
  ]
};
