export const IndexAccessExpression = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    operand: parse(ast.operand, options, parse),
    openBracket: ast.openBracket.text,
    start: ast.start ? parse(ast.start, options, parse) : undefined,
    end: ast.end ? parse(ast.end, options, parse) : undefined,
    closeBracket: ast.closeBracket.text
  }),
  // TODO: implement print
  print: () => ['IndexAccessExpression']
};
