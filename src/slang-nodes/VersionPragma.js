export const VersionPragma = {
  parse: ({ offsets, ast, options, parse }) => ({
    solidityKeyword: ast.solidityKeyword.text,
    sets: parse(ast.sets, options, parse, offsets)
  }),
  print: ({ node, path, print }) => [
    node.solidityKeyword,
    ' ',
    path.call(print, 'sets')
  ]
};
