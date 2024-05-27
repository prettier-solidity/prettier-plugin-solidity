export const InheritanceSpecifier = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    isKeyword: ast.isKeyword.text,
    types: parse(ast.types, options, parse)
  }),
  print: ({ node, path, print }) => [
    ` ${node.isKeyword}`,
    path.call(print, 'types')
  ]
};
