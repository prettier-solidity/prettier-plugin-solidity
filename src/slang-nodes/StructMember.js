export const StructMember = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    typeName: parse(ast.typeName, options, parse, offsets),
    name: ast.name.text,
    semicolon: ast.semicolon.text
  }),
  print: ({ node, path, print }) => [
    path.call(print, 'typeName'),
    ` ${node.name}${node.semicolon}`
  ]
};
