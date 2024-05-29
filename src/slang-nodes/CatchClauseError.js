export const CatchClauseError = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    name: ast.name?.text,
    parameters: parse(ast.parameters, options, parse)
  }),
  print: ({ node, path, print }) => [
    node.name ? node.name : '',
    path.call(print, 'parameters'),
    ' '
  ]
};
