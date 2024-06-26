export const UncheckedBlock = {
  parse: ({ offsets, ast, options, parse }) => ({
    uncheckedKeyword: ast.uncheckedKeyword.text,
    block: parse(ast.block, options, parse, offsets)
  }),
  print: ({ node, path, print }) => [
    `${node.uncheckedKeyword} `,
    path.call(print, 'block')
  ]
};
