export const YulVariableDeclarationStatement = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    letKeyword: ast.letKeyword.text,
    names: ast.names.text,
    value: ast.value ? parse(ast.value, options, parse, offsets) : undefined
  }),
  print: ({ node, path, print }) => [
    node.letKeyword,
    ' ',
    node.names,
    ' ',
    node.value ? path.call(print, 'value') : ''
  ]
};
