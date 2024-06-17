export const TupleValue = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    expression: ast.expression
      ? parse(ast.expression, options, parse, offsets)
      : undefined
  }),
  print: ({ node, path, print }) =>
    node.expression ? path.call(print, 'expression') : ''
};
