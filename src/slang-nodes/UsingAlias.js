export const UsingAlias = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    asKeyword: ast.asKeyword.text,
    operator: parse(ast.operator, options, parse)
  }),
  // TODO: implement print
  print: () => ['TODO: UsingAlias']
};