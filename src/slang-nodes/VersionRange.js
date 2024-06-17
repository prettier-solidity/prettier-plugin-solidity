export const VersionRange = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    leftOperand: parse(ast.leftOperand, options, parse, offsets),
    operator: ast.operator.text,
    rightOperand: parse(ast.rightOperand, options, parse, offsets)
  }),
  // TODO: implement print
  print: ({ node, path, print, options }) => ['TODO: VersionRange']
};
