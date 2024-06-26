export const StructMember = {
  parse: ({ offsets, ast, options, parse }) => ({
    typeName: parse(ast.typeName, options, parse, offsets),
    name: ast.name.text,
    semicolon: ast.semicolon.text
  }),
  print: ({ node, path, print }) => [
    path.call(print, 'typeName'),
    ` ${node.name}${node.semicolon}`
  ]
};
