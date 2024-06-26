export const NamedArgument = {
  parse: ({ offsets, ast, options, parse }) => ({
    name: ast.name.text,
    colon: ast.colon.text,
    value: parse(ast.value, options, parse, offsets)
  }),
  print: ({ node, path, print }) => [
    `${node.name}${node.colon} `,
    path.call(print, 'value')
  ]
};
