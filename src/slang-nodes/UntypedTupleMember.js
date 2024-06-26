export const UntypedTupleMember = {
  parse: ({ offsets, ast, options, parse }) => ({
    storageLocation: ast.storageLocation
      ? parse(ast.storageLocation, options, parse, offsets)
      : undefined,
    name: ast.name.text
  }),
  // TODO: implement print
  print: ({ node, path, print, options }) => [
    'TODO: UntypedTupleMemberUntypedTupleMember'
  ]
};
