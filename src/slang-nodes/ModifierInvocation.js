export const ModifierInvocation = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    name: parse(ast.name, options, parse),
    arguments: ast.arguments ? parse(ast.arguments, options, parse) : undefined
  }),
  // TODO: implement print
  print: () => ['ModifierInvocation']
};
