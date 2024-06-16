export const TupleValue = {
  parse: ({ ast, options, parse }) => ({
    expression: ast.expression
      ? parse(ast.expression, options, parse)
      : undefined
  }),
  print: ({ node, path, print }) =>
    node.expression ? path.call(print, 'expression') : ''
};
