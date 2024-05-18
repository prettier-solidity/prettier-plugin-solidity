export const TupleDeconstructionStatement = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    varKeyword: ast.varKeyword?.text,
    openParen: ast.openParen.text,
    elements: parse(ast.elements, options, parse),
    closeParen: ast.closeParen.text,
    equal: ast.equal.text,
    expression: parse(ast.expression, options, parse),
    semicolon: ast.semicolon.text
  }),
  // TODO: implement print
  print: () => ['TupleDeconstructionStatement']
};
