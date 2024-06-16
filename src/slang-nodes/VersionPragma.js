export const VersionPragma = {
  parse: ({ ast, options, parse }) => ({
    solidityKeyword: ast.solidityKeyword.text,
    sets: parse(ast.sets, options, parse)
  }),
  print: ({ node, path, print }) => [
    node.solidityKeyword,
    ' ',
    path.call(print, 'sets')
  ]
};
