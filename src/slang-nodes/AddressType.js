export const AddressType = {
  parse: ({ ast }) => ({
    kind: ast.cst.kind,
    addressKeyword: ast.addressKeyword.text,
    payableKeyword: ast.payableKeyword?.text
  }),
  print: ({ node }) => [
    node.addressKeyword,
    node.payableKeyword ? ` ${node.payableKeyword}` : ''
  ]
};
