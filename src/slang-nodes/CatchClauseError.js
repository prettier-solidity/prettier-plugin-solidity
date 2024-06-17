export const CatchClauseError = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    name: ast.name?.text,
    parameters: parse(ast.parameters, options, parse, offsets)
  }),
  print: ({ node, path, print }) => [
    node.name ? node.name : '',
    path.call(print, 'parameters'),
    ' '
  ]
};
