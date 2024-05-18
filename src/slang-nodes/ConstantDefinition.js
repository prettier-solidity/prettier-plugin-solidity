export const ConstantDefinition = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    typeName: parse(ast.typeName, options, parse),
    constantKeyword: ast.constantKeyword.text,
    name: ast.name.text,
    equal: ast.equal.text,
    value: parse(ast.value, options, parse),
    semicolon: ast.semicolon.text
  }),
  // TODO: implement print
  print: () => ['ConstantDefinition']
};
