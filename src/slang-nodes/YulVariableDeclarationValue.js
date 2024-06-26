export const YulVariableDeclarationValue = {
  parse: ({ offsets, ast, options, parse }) => ({
    assignment: parse(ast.assignment, options, parse, offsets),
    expression: parse(ast.expression, options, parse, offsets)
  }),
  print: ({ path, print }) => [
    path.call(print, 'assignment'),
    ' ',
    path.call(print, 'expression')
  ]
};
