export const ImportDirective = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    importKeyword: ast.importKeyword.text,
    clause: parse(ast.clause, options, parse, offsets),
    semicolon: ast.semicolon.text
  }),
  print: ({ node, path, print }) => [
    `${node.importKeyword} `,
    path.call(print, 'clause'),
    node.semicolon
  ]
};
