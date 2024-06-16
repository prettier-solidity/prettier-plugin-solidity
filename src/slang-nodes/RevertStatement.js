export const RevertStatement = {
  parse: ({ ast, options, parse }) => ({
    revertKeyword: ast.revertKeyword.text,
    error: ast.error ? parse(ast.error, options, parse) : undefined,
    arguments: parse(ast.arguments, options, parse),
    semicolon: ast.semicolon.text
  }),
  print: ({ node, path, print }) => [
    `${node.revertKeyword} `,
    node.error ? path.call(print, 'error') : '',
    path.call(print, 'arguments'),
    node.semicolon
  ]
};
