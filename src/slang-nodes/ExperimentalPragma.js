export const ExperimentalPragma = {
  parse: ({ ast }) => ({
    kind: ast.cst.kind,
    experimentalKeyword: ast.experimentalKeyword.text,
    feature: ast.feature
  }),
  // TODO: implement print
  print: () => ['TODO: ExperimentalPragma']
};
