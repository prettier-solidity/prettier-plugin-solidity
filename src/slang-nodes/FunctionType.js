export const FunctionType = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    functionKeyword: ast.functionKeyword.text,
    parameters: parse(ast.parameters, options, parse),
    attributes: parse(ast.attributes, options, parse),
    returns: ast.returns ? parse(ast.returns, options, parse) : undefined
  }),
  // TODO: implement print
  print: () => ['FunctionType']
};
