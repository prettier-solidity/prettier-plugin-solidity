export const ABICoderPragma = {
  parse: ({ node, ast }) => ({
    ...node,
    abicoderKeyword: ast.abicoderKeyword.text,
    version: ast.version.text
  }),
  print: ({ node }) => `${node.abicoderKeyword} ${node.version}`
};
