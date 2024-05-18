export const RevertStatement = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    revertKeyword: ast.revertKeyword.text,
    error: ast.error ? parse(ast.error, options, parse) : undefined,
    arguments: parse(ast.arguments, options, parse),
    semicolon: ast.semicolon.text
  }),
  // TODO: implement print
  print: () => ['RevertStatement']
};
