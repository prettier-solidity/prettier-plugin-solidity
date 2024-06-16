export const YulVariableDeclarationValue = {
  parse: ({ ast, options, parse }) => ({
    assignment: parse(ast.assignment, options, parse),
    expression: parse(ast.expression, options, parse)
  }),
  print: ({ path, print }) => [
    path.call(print, 'assignment'),
    ' ',
    path.call(print, 'expression')
  ]
};
