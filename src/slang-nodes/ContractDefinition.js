export const ContractDefinition = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    abstractKeyword: ast.abstractKeyword?.text,
    contractKeyword: ast.contractKeyword.text,
    name: ast.name.text,
    inheritence: ast.inheritence
      ? parse(ast.inheritence, options, parse)
      : undefined,
    openBrace: ast.openBrace.text,
    members: parse(ast.members, options, parse),
    closeBrace: ast.closeBrace.text
  }),
  // TODO: implement print
  print: () => ['ContractDefinition']
};
