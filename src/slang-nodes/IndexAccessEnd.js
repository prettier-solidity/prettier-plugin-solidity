export const IndexAccessEnd = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    colon: ast.colon.text,
    end: ast.end ? parse(ast.end, options, parse) : undefined
  }),
  // TODO: implement print
  print: () => ['IndexAccessEnd']
};
