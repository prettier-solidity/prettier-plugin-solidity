export const ConstructorDefinition = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    constructorKeyword: ast.constructorKeyword.text,
    parameters: parse(ast.parameters, options, parse),
    attributes: parse(ast.attributes, options, parse),
    body: parse(ast.body, options, parse)
  }),
  // TODO: implement print
  print: () => ['TODO: ConstructorDefinition']
};
