export const ForStatement = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    forKeyword: ast.forKeyword.text,
    openParen: ast.openParen.text,
    initialization: parse(ast.initialization, options, parse),
    condition: parse(ast.condition, options, parse),
    iterator: ast.iterator ? parse(ast.iterator, options, parse) : undefined,
    closeParen: ast.closeParen.text,
    body: parse(ast.body, options, parse)
  }),
  // TODO: implement print
  print: () => ['TODO: ForStatement']
};
