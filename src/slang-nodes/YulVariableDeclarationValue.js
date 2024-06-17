export const YulVariableDeclarationValue = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    assignment: parse(ast.assignment, options, parse, offsets),
    expression: parse(ast.expression, options, parse, offsets)
  }),
  print: ({ path, print }) => [
    path.call(print, 'assignment'),
    ' ',
    path.call(print, 'expression')
  ]
};
