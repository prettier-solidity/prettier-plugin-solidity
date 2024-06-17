export const OverrideSpecifier = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
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
