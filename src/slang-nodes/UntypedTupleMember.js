export const UntypedTupleMember = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
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
