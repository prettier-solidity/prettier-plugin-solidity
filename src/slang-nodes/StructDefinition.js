export const StructDefinition = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    structKeyword: ast.structKeyword.text,
    name: ast.name.text,
    openBrace: ast.openBrace.text,
    members: parse(ast.members, options, parse),
    closeBrace: ast.closeBrace.text
  }),
  // TODO: implement print
  print: () => ['TODO: StructDefinition']
};
