export const VersionPragma = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    solidityKeyword: ast.solidityKeyword.text,
    sets: parse(ast.sets, options, parse, offsets)
  }),
  print: ({ node, path, print }) => [
    node.solidityKeyword,
    ' ',
    path.call(print, 'sets')
  ]
};
