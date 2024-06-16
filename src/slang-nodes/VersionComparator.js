export const VersionComparator = {
  parse: ({ ast, options, parse }) => ({
    operator: ast.operator.text,
    operand: parse(ast.operand, options, parse)
  }),
  print: ({ node, path, print }) => [node.operator, path.call(print, 'operand')]
};
