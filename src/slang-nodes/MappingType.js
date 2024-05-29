export const MappingType = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    mappingKeyword: ast.mappingKeyword.text,
    openParen: ast.openParen.text,
    keyType: parse(ast.keyType, options, parse),
    equalGreaterThan: ast.equalGreaterThan.text,
    valueType: parse(ast.valueType, options, parse),
    closeParen: ast.closeParen.text
  }),
  print: ({ node, path, print }) => [
    `${node.mappingKeyword}${node.openParen}`,
    path.call(print, 'keyType'),
    ` ${node.equalGreaterThan} `,
    path.call(print, 'valueType'),
    node.closeParen
  ]
};
