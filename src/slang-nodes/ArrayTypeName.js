export const ArrayTypeName = {
  parse: ({ offsets, ast, options, parse }) => ({
    operand: parse(ast.operand, options, parse, offsets),
    openBracket: ast.openBracket.text,
    index: ast.index ? parse(ast.index, options, parse, offsets) : undefined,
    closeBracket: ast.closeBracket.text
  }),
  print: ({ node, path, print }) => [
    path.call(print, 'operand'),
    node.openBracket,
    node.index ? path.call(print, 'index') : '',
    node.closeBracket
  ]
};
