export const NamedArgument = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    name: ast.name.text,
    colon: ast.colon.text,
    value: parse(ast.value, options, parse, offsets)
  }),
  print: ({ node, path, print }) => [
    `${node.name}${node.colon} `,
    path.call(print, 'value')
  ]
};
