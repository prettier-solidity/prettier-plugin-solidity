export const ABICoderPragma = {
  parse: ({ ast }) => ({
    kind: ast.cst.kind,
    abicoderKeyword: ast.abicoderKeyword.text,
    version: ast.version.text
  }),
  print: ({ node }) => `${node.abicoderKeyword} ${node.version}`
};
