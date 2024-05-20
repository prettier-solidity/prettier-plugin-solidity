export const StructMember = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    typeName: parse(ast.typeName, options, parse),
    name: ast.name.text,
    semicolon: ast.semicolon.text
  }),
  // TODO: implement print
  print: () => ['TODO: StructMember']
};
