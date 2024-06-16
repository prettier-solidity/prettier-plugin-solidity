export const OverridePathsDeclaration = {
  parse: ({ ast, options, parse }) => ({
    openParen: ast.openParen.text,
    paths: parse(ast.paths, options, parse),
    closeParen: ast.closeParen.text
  }),
  // TODO: implement print
  print: ({ node, path, print, options }) => ['TODO: OverridePathsDeclaration']
};
