export const EventDefinition = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    eventKeyword: ast.eventKeyword.text,
    name: ast.name.text,
    parameters: parse(ast.parameters, options, parse),
    anonymousKeyword: ast.anonymousKeyword?.text,
    semicolon: ast.semicolon.text
  }),
  // TODO: implement print
  print: () => ['EventDefinition']
};
