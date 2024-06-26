export const StructDefinition = {
  parse: ({ offsets, ast, options, parse }) => ({
    structKeyword: ast.structKeyword.text,
    name: ast.name.text,
    openBrace: ast.openBrace.text,
    members: parse(ast.members, options, parse, offsets),
    closeBrace: ast.closeBrace.text
  }),
  print: ({ node, path, print }) => [
    `${node.structKeyword} ${node.name} ${node.openBrace}`,
    path.call(print, 'members'),
    node.closeBrace
  ]
};
