export const VersionComparator = {
  parse: ({ offsets, ast, options, parse }) => ({
    operator: ast.operator.text,
    operand: parse(ast.operand, options, parse, offsets)
  }),
  print: ({ node, path, print }) => [node.operator, path.call(print, 'operand')]
};
