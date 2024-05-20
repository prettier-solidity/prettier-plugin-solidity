export const CatchClauseError = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    name: ast.name?.text,
    parameters: parse(ast.parameters, options, parse)
  }),
  // TODO: implement print
  print: () => ['TODO: CatchClauseError']
};
