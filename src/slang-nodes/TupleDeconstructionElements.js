export const TupleDeconstructionElements = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    items: ast.items.map((item) => parse(item, options, parse)),
    separators: ast.separators.map((separator) => separator.text)
  }),
  // TODO: implement print
  print: () => ['TupleDeconstructionElements']
};
