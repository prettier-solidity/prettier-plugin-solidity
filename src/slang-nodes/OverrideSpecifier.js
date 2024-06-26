export const OverrideSpecifier = {
  parse: ({ offsets, ast, options, parse }) => ({
    overrideKeyword: ast.overrideKeyword.text,
    overridden: ast.overridden
      ? parse(ast.overridden, options, parse, offsets)
      : undefined
  }),
  print: ({ node, path, print }) => [
    node.overrideKeyword,
    node.overridden ? path.call(print, 'overridden') : ''
  ]
};
