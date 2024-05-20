export const ArrayTypeName = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    operand: parse(ast.operand, options, parse),
    openBracket: ast.openBracket.text,
    index: ast.index ? parse(ast.index, options, parse) : undefined,
    closeBracket: ast.closeBracket.text
  }),
  // TODO: implement print
  print: () => ['TODO: ArrayTypeName']
};
