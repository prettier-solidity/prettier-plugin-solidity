export const AssemblyFlags = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    items: ast.items.maps((item) => parse(item, options, parse)),
    separators: ast.separators.maps((separator) => separator.text)
  }),
  // TODO: implement print
  print: () => ['AssemblyFlags']
};
