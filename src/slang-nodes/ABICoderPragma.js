export const ABICoderPragma = {
  parse: ({ node, offsets, ast }) => ({
    ...node,
    abicoderKeyword: ast.abicoderKeyword.text,
    version: ast.version.text
  }),
  print: ({ node }) => `${node.abicoderKeyword} ${node.version}`
};
