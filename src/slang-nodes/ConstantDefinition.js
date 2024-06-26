export const ConstantDefinition = {
  parse: ({ offsets, ast, options, parse }) => ({
    typeName: parse(ast.typeName, options, parse, offsets),
    constantKeyword: ast.constantKeyword.text,
    name: ast.name.text,
    equal: ast.equal.text,
    value: parse(ast.value, options, parse, offsets),
    semicolon: ast.semicolon.text
  }),
  // TODO: implement print
  print: ({ node, path, print, options }) => ['TODO: ConstantDefinition']
};
