export const NewExpression = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    newKeyword: ast.newKeyword.text,
    typeName: parse(ast.typeName, options, parse)
  }),
  // TODO: implement print
  print: () => ['TODO: NewExpression']
};
