export const ABICoderPragma = {
  parse: ({ ast }) => ({
    kind: ast.cst.kind,
    abicoderKeyword: ast.abicoderKeyword.text,
    version: ast.version.text
  }),
  // TODO: implement print
  print: () => ['ABICoderPragma']
};
