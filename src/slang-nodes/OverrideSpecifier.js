export const OverrideSpecifier = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    overrideKeyword: ast.overrideKeyword.text,
    overridden: ast.overridden
      ? parse(ast.overridden, options, parse)
      : undefined
  }),
  // TODO: implement print
  print: () => ['TODO: OverrideSpecifier']
};
