export const UsingDirective = {
  parse: ({ ast, options, parse }) => ({
    usingKeyword: ast.usingKeyword.text,
    clause: parse(ast.clause, options, parse),
    forKeyword: ast.forKeyword.text,
    target: parse(ast.target, options, parse),
    globalKeyword: ast.globalKeyword?.text,
    semicolon: ast.semicolon.text
  }),
  print: ({ node, path, print }) => [
    node.usingKeyword,
    ' ',
    path.call(print, 'clause'),
    ' ',
    node.forKeyword,
    ' ',
    path.call(print, 'target'),
    node.globalKeyword ? ` ${node.globalKeyword}` : '',
    node.semicolon
  ]
};
