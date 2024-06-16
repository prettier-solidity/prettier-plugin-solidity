export const EmitStatement = {
  parse: ({ ast, options, parse }) => ({
    emitKeyword: ast.emitKeyword.text,
    event: parse(ast.event, options, parse),
    arguments: parse(ast.arguments, options, parse),
    semicolon: ast.semicolon.text
  }),
  print: ({ node, path, print }) => [
    `${node.emitKeyword} `,
    path.call(print, 'event'),
    path.call(print, 'arguments'),
    node.semicolon
  ]
};
