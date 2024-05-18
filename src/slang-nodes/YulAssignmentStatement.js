export const YulAssignmentStatement = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    names: parse(ast.names, options, parse),
    assignment: parse(ast.assignment, options, parse),
    expression: parse(ast.expression, options, parse)
  }),
  // TODO: implement print
  print: () => ['YulAssignmentStatement']
};
