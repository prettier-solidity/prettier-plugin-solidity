export const InheritanceSpecifier = {
  parse: ({ offsets, ast, options, parse }) => ({
    isKeyword: ast.isKeyword.text,
    types: parse(ast.types, options, parse, offsets)
  }),
  print: ({ node, path, print }) => [node.isKeyword, path.call(print, 'types')]
};
