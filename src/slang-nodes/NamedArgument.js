export const NamedArgument = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    name: ast.name.text,
    colon: ast.colon.text,
    value: parse(ast.value, options, parse)
  }),
  // TODO: implement print
  print: () => ['NamedArgument']
};
