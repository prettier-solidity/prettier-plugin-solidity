export const UsingDirective = {
  parse: ({ offsets, ast, options, parse }) => ({
    usingKeyword: ast.usingKeyword.text,
    clause: parse(ast.clause, options, parse, offsets),
    forKeyword: ast.forKeyword.text,
    target: parse(ast.target, options, parse, offsets),
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
