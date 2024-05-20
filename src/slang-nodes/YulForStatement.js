export const YulForStatement = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    forKeyword: ast.forKeyword.text,
    initialization: parse(ast.initialization, options, parse),
    condition: parse(ast.condition, options, parse),
    iterator: parse(ast.iterator, options, parse),
    body: parse(ast.body, options, parse)
  }),
  // TODO: implement print
  print: () => ['TODO: YulForStatement']
};
