export const LibraryDefinition = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    libraryKeyword: ast.libraryKeyword.text,
    name: ast.name.text,
    openBrace: ast.openBrace.text,
    members: parse(ast.members, options, parse),
    closeBrace: ast.closeBrace.text
  }),
  // TODO: implement print
  print: ({ node, path, print, options }) => ['TODO: LibraryDefinition']
};
