export const TupleExpression = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    openParen: ast.openParen.text,
    items: parse(ast.items, options, parse),
    closeParen: ast.closeParen.text
  }),
  // TODO: implement print
  print: () => ['TODO: TupleExpression']
};
