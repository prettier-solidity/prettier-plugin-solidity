export const TryStatement = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    tryKeyword: ast.tryKeyword.text,
    expression: parse(ast.expression, options, parse),
    returns: ast.returns ? parse(ast.returns, options, parse) : undefined,
    body: parse(ast.body, options, parse),
    catchClauses: parse(ast.catchClauses, options, parse)
  }),
  // TODO: implement print
  print: () => ['TryStatement']
};
