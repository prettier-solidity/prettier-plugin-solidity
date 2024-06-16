export const EventParameter = {
  parse: ({ ast, options, parse }) => ({
    typeName: parse(ast.typeName, options, parse),
    indexedKeyword: ast.indexedKeyword?.text,
    name: ast.name?.text
  }),
  print: ({ node, path, print }) => [
    path.call(print, 'typeName'),
    node.indexedKeyword ? ` ${node.indexedKeyword}` : '',
    node.name ? ` ${node.name}` : ''
  ]
};
