export const AssemblyFlagsDeclaration = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    openParen: ast.openParen.text,
    flags: parse(ast.flags, options, parse),
    closeParen: ast.closeParen.text
  }),
  // TODO: implement print
  print: () => ['AssemblyFlagsDeclaration']
};
