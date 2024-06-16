export const NamedArgument = {
  parse: ({ ast, options, parse }) => ({
    name: ast.name.text,
    colon: ast.colon.text,
    value: parse(ast.value, options, parse)
  }),
  print: ({ node, path, print }) => [
    `${node.name}${node.colon} `,
    path.call(print, 'value')
  ]
};
