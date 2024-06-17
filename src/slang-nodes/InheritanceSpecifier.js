export const InheritanceSpecifier = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    isKeyword: ast.isKeyword.text,
    types: parse(ast.types, options, parse, offsets)
  }),
  print: ({ node, path, print }) => [
    ` ${node.isKeyword}`,
    path.call(print, 'types')
  ]
};
