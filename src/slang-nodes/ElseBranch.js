export const ElseBranch = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    elseKeyword: ast.elseKeyword.text,
    body: parse(ast.body, options, parse)
  }),
  // TODO: implement print
  print: () => ['TODO: ElseBranch']
};
