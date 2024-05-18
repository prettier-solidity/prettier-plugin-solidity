export const EnumDefinition = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    enumKeyword: ast.enumKeyword.text,
    name: ast.name.text,
    openBrace: ast.openBrace.text,
    members: parse(ast.members, options, parse),
    closeBrace: ast.closeBrace.text
  }),
  // TODO: implement print
  print: () => ['EmitStatement']
};
