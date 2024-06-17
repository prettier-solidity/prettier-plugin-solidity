export const ConstantDefinition = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
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
