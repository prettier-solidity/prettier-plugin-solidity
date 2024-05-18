export const YulVariableDeclarationStatement = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    letKeyword: ast.letKeyword.text,
    names: ast.names.text,
    value: ast.value ? parse(ast.value, options, parse) : undefined
  }),
  // TODO: implement print
  print: () => ['YulVariableDeclarationStatement']
};
