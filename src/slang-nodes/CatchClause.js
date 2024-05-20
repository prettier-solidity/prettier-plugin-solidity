export const CatchClause = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    catchKeyword: ast.catchKeyword.text,
    error: ast.error ? parse(ast.error, options, parse) : undefined,
    body: parse(ast.body, options, parse)
  }),
  // TODO: implement print
  print: () => ['TODO: CatchClause']
};
