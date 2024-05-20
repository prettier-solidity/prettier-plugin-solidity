export const ArrayTypeName = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    operand: parse(ast.operand, options, parse),
    openBracket: ast.openBracket.text,
    index: ast.index ? parse(ast.index, options, parse) : undefined,
    closeBracket: ast.closeBracket.text
  }),
  print: ({ node, path, print }) => [
    path.call(print, 'operand'),
    node.openBracket,
    node.index ? path.call(print, 'index') : '',
    node.closeBracket
  ]
};
