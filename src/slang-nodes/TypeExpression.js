export const TypeExpression = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    typeKeyword: ast.typeKeyword.text,
    openParen: ast.openParen.text,
    typeName: parse(ast.typeName, options, parse),
    closeParen: ast.closeParen.text
  }),
  // TODO: implement print
  print: () => ['TODO: TypeExpression']
};
