export const ABICoderPragma = {
  parse: ({ ast }) => ({
    abicoderKeyword: ast.abicoderKeyword.text,
    version: ast.version.text
  }),
  print: ({ node }) => `${node.abicoderKeyword} ${node.version}`
};
