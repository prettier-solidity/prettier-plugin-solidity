export const UncheckedBlock = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    uncheckedKeyword: ast.uncheckedKeyword.text,
    block: parse(ast.block, options, parse)
  }),
  print: ({ node, path, print }) => [
    `${node.uncheckedKeyword} `,
    path.call(print, 'block')
  ]
};
