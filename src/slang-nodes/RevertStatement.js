export const RevertStatement = {
  parse: ({ offsets, ast, options, parse }) => ({
    revertKeyword: ast.revertKeyword.text,
    error: ast.error ? parse(ast.error, options, parse, offsets) : undefined,
    arguments: parse(ast.arguments, options, parse, offsets),
    semicolon: ast.semicolon.text
  }),
  print: ({ node, path, print }) => [
    `${node.revertKeyword} `,
    node.error ? path.call(print, 'error') : '',
    path.call(print, 'arguments'),
    node.semicolon
  ]
};
