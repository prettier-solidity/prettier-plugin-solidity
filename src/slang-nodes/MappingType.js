export const MappingType = {
  parse: ({ offsets, ast, options, parse }) => ({
    mappingKeyword: ast.mappingKeyword.text,
    openParen: ast.openParen.text,
    keyType: parse(ast.keyType, options, parse, offsets),
    equalGreaterThan: ast.equalGreaterThan.text,
    valueType: parse(ast.valueType, options, parse, offsets),
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
