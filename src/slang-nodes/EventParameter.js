export const EventParameter = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    typeName: parse(ast.typeName, options, parse, offsets),
    indexedKeyword: ast.indexedKeyword?.text,
    name: ast.name?.text
  }),
  print: ({ node, path, print }) => [
    path.call(print, 'typeName'),
    node.indexedKeyword ? ` ${node.indexedKeyword}` : '',
    node.name ? ` ${node.name}` : ''
  ]
};
