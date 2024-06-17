export const UncheckedBlock = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    uncheckedKeyword: ast.uncheckedKeyword.text,
    block: parse(ast.block, options, parse, offsets)
  }),
  print: ({ node, path, print }) => [
    `${node.uncheckedKeyword} `,
    path.call(print, 'block')
  ]
};
