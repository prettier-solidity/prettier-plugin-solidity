export const TupleValue = {
  parse: ({ offsets, ast, options, parse }) => ({
    expression: ast.expression
      ? parse(ast.expression, options, parse, offsets)
      : undefined
  }),
  print: ({ node, path, print }) =>
    node.expression ? path.call(print, 'expression') : ''
};
