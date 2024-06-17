export const OverridePathsDeclaration = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    openParen: ast.openParen.text,
    paths: parse(ast.paths, options, parse, offsets),
    closeParen: ast.closeParen.text
  }),
  // TODO: implement print
  print: ({ node, path, print, options }) => ['TODO: OverridePathsDeclaration']
};
