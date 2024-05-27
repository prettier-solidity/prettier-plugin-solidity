export const ErrorDefinition = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    errorKeyword: ast.errorKeyword.text,
    name: ast.name.text,
    members: parse(ast.members, options, parse),
    semicolon: ast.semicolon.text
  }),
  print: ({ node, path, print }) => [
    `${node.errorKeyword} ${node.name}`,
    path.call(print, 'members'),
    node.semicolon
  ]
};
