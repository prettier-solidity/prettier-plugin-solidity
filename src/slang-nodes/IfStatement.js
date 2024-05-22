export const IfStatement = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    ifKeyword: ast.ifKeyword.text,
    openParen: ast.openParen.text,
    condition: parse(ast.condition, options, parse),
    closeParen: ast.closeParen.text,
    body: parse(ast.body, options, parse),
    elseBranch: ast.elseBranch
      ? parse(ast.elseBranch, options, parse)
      : undefined
  }),
  print: ({ node, path, print }) => [
    node.ifKeyword,
    node.openParen,
    path.call(print, 'condition'),
    node.closeParen,
    path.call(print, 'body'),
    node.elseBranch ? path.call(print, 'elseBranch') : ''
  ]
};
