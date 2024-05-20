export const TupleDeconstructionElement = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    member: ast.member ? parse(ast.member, options, parse) : undefined
  }),
  // TODO: implement print
  print: () => ['TODO: TupleDeconstructionElement']
};
