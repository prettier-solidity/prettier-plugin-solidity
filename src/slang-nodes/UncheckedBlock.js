export const UncheckedBlock = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    uncheckedKeyword: ast.uncheckedKeyword.text,
    block: parse(ast.block, options, parse)
  }),
  // TODO: implement print
  print: ({ node, path, print, options }) => ['TODO: UncheckedBlock']
};
