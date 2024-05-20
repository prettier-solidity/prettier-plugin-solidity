export const FunctionDefinition = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    functionKeyword: ast.functionKeyword.text,
    name: parse(ast.name, options, parse),
    parameters: parse(ast.parameters, options, parse),
    attributes: parse(ast.attributes, options, parse),
    returns: ast.returns ? parse(ast.returns, options, parse) : undefined,
    body: parse(ast.body, options, parse)
  }),
  // TODO: implement print
  print: () => ['TODO: FunctionDefinition']
};
