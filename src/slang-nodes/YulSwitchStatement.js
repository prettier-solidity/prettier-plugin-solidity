export const YulSwitchStatement = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    switchKeyword: ast.switchKeyword.text,
    expression: parse(ast.expression, options, parse),
    cases: parse(ast.cases, options, parse)
  }),
  // TODO: implement print
  print: () => ['TODO: YulSwitchStatement']
};
