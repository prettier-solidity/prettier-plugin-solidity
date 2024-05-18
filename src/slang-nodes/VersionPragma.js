export const VersionPragma = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    solidityKeyword: ast.solidityKeyword.text,
    sets: parse(ast.sets, options, parse)
  }),
  print: ({ node, path, print }) => [
    node.solidityKeyword,
    ' ',
    path.call(print, 'sets')
  ]
};
