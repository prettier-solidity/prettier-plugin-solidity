export const YulVariableAssignmentStatement = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    names: parse(ast.names, options, parse),
    assignment: parse(ast.assignment, options, parse),
    expression: parse(ast.expression, options, parse)
  }),
  print: ({ path, print }) => [
    path.call(print, 'names'),
    ' ',
    path.call(print, 'assignment'),
    ' ',
    path.call(print, 'expression')
  ]
};
