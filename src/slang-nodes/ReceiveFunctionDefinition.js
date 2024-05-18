export const ReceiveFunctionDefinition = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    receiveKeyword: ast.receiveKeyword.text,
    parameters: parse(ast.parameters, options, parse),
    attributes: parse(ast.attributes, options, parse),
    body: parse(ast.body, options, parse)
  }),
  // TODO: implement print
  print: () => ['ReceiveFunctionDefinition']
};
