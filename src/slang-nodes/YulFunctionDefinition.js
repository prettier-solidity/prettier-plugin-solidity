export const YulFunctionDefinition = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    functionKeyword: ast.functionKeyword.text,
    name: ast.name.text,
    parameters: parse(ast.parameters, options, parse),
    returns: ast.returns ? parse(ast.returns, options, parse) : undefined,
    body: parse(ast.body, options, parse)
  }),
  // TODO: implement print
  print: () => ['YulFunctionDefinition']
};
