export const AssemblyStatement = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    assemblyKeyword: ast.assemblyKeyword.text,
    label: ast.label ? parse(ast.label, options, parse) : undefined,
    flags: ast.flags ? parse(ast.flags, options, parse) : undefined,
    body: parse(ast.body, options, parse)
  }),
  // TODO: implement print
  print: () => ['AssemblyStatement']
};
