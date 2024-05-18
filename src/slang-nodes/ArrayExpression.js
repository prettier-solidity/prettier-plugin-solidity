export const ArrayExpression = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    openBracket: ast.openBracket.text,
    items: parse(ast.items, options, parse),
    closeBracket: ast.closeBracket.text
  }),
  // TODO: implement print
  print: () => ['ArrayExpression']
};
