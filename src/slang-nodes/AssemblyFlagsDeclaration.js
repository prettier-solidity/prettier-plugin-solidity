export const AssemblyFlagsDeclaration = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    openParen: ast.openParen.text,
    flags: parse(ast.flags, options, parse),
    closeParen: ast.closeParen.text
  }),
  print: ({ node, path, print }) => [
    node.openParen,
    path.call(print, 'flags'),
    node.closeParen
  ]
};
