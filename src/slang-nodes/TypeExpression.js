export const TypeExpression = {
  parse: ({ offsets, ast, options, parse }) => ({
    typeKeyword: ast.typeKeyword.text,
    openParen: ast.openParen.text,
    typeName: parse(ast.typeName, options, parse, offsets),
    closeParen: ast.closeParen.text
  }),
  // TODO: implement print
  print: ({ node, path, print, options }) => ['TODO: TypeExpression']
};
