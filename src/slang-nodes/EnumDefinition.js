export const EnumDefinition = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    enumKeyword: ast.enumKeyword.text,
    name: ast.name.text,
    openBrace: ast.openBrace.text,
    members: parse(ast.members, options, parse, offsets),
    closeBrace: ast.closeBrace.text
  }),
  print: ({ node, path, print }) => [
    `${node.enumKeyword} ${node.name} ${node.openBrace}`,
    path.call(print, 'members'),
    node.closeBrace
  ]
};
