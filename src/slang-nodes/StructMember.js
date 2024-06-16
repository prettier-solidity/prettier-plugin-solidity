export const StructMember = {
  parse: ({ ast, options, parse }) => ({
    typeName: parse(ast.typeName, options, parse),
    name: ast.name.text,
    semicolon: ast.semicolon.text
  }),
  print: ({ node, path, print }) => [
    path.call(print, 'typeName'),
    ` ${node.name}${node.semicolon}`
  ]
};
