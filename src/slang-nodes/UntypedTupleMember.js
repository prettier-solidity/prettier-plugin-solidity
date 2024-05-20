export const UntypedTupleMember = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    storageLocation: ast.storageLocation
      ? parse(ast.storageLocation, options, parse)
      : undefined,
    name: ast.name.text
  }),
  // TODO: implement print
  print: () => ['TODO: UntypedTupleMemberUntypedTupleMember']
};
