export const CatchClauseError = {
  parse: ({ offsets, ast, options, parse }) => ({
    name: ast.name?.text,
    parameters: parse(ast.parameters, options, parse, offsets)
  }),
  print: ({ node, path, print }) => [
    node.name ? node.name : '',
    path.call(print, 'parameters'),
    ' '
  ]
};
