export const OverrideSpecifier = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    overrideKeyword: ast.overrideKeyword.text,
    overridden: ast.overridden
      ? parse(ast.overridden, options, parse)
      : undefined
  }),
  print: ({ node, path, print }) => [
    node.overrideKeyword,
    node.overridden ? path.call(print, 'overridden') : ''
  ]
};
