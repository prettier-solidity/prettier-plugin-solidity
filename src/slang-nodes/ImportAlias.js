export const ImportAlias = {
  parse: ({ ast }) => ({
    kind: ast.cst.kind,
    asKeyword: ast.asKeyword.text,
    identifier: ast.identifier.text
  }),
  // TODO: implement print
  print: () => ['TODO: ImportAlias']
};
