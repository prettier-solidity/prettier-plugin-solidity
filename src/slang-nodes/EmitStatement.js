export const EmitStatement = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    emitKeyword: ast.emitKeyword.text,
    event: parse(ast.event, options, parse, offsets),
    arguments: parse(ast.arguments, options, parse, offsets),
    semicolon: ast.semicolon.text
  }),
  print: ({ node, path, print }) => [
    `${node.emitKeyword} `,
    path.call(print, 'event'),
    path.call(print, 'arguments'),
    node.semicolon
  ]
};
