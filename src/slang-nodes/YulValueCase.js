export const YulValueCase = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    caseKeyword: ast.caseKeyword.text,
    value: parse(ast.value, options, parse),
    body: parse(ast.body, options, parse)
  }),
  // TODO: implement print
  print: () => ['TODO: YulValueCase']
};
