export const VersionRange = {
  parse: ({ offsets, ast, options, parse }) => ({
    leftOperand: parse(ast.leftOperand, options, parse, offsets),
    operator: ast.operator.text,
    rightOperand: parse(ast.rightOperand, options, parse, offsets)
  }),
  // TODO: implement print
  print: ({ node, path, print, options }) => ['TODO: VersionRange']
};
