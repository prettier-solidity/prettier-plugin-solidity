export const UntypedTupleMember = {
  parse: ({ ast, options, parse }) => ({
    storageLocation: ast.storageLocation
      ? parse(ast.storageLocation, options, parse)
      : undefined,
    name: ast.name.text
  }),
  // TODO: implement print
  print: ({ node, path, print, options }) => [
    'TODO: UntypedTupleMemberUntypedTupleMember'
  ]
};
