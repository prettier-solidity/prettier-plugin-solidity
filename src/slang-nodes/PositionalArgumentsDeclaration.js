export const PositionalArgumentsDeclaration = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    openParen: ast.openParen.TokenNode,
    arguments: parse(ast.arguments, options, parse),
    closeParen: ast.closeParen.TokenNode
  }),
  // TODO: implement print
  print: () => ['TODO: PositionalArgumentsDeclaration']
};
