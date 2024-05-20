export const EmitStatement = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    emitKeyword: ast.emitKeyword.text,
    event: parse(ast.event, options, parse),
    arguments: parse(ast.arguments, options, parse),
    semicolon: ast.semicolon.text
  }),
  // TODO: implement print
  print: () => ['TODO: EmitStatement']
};
