export const NamedArgumentsDeclaration = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    openParen: ast.openParen.text,
    arguments: ast.arguments ? parse(ast.arguments, options, parse) : undefined,
    closeParen: ast.closeParen.text
  }),
  // TODO: implement print
  print: ({ node, path, print, options }) => ['TODO: NamedArgumentsDeclaration']
};
