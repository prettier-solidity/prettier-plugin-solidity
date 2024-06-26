export const YulAssignmentStatement = {
  parse: ({ offsets, ast, options, parse }) => ({
    names: parse(ast.names, options, parse, offsets),
    assignment: parse(ast.assignment, options, parse, offsets),
    expression: parse(ast.expression, options, parse, offsets)
  }),
  print: ({ path, print }) => [
    path.call(print, 'names'),
    ' ',
    path.call(print, 'assignment'),
    ' ',
    path.call(print, 'expression')
  ]
};
