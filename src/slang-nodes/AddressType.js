export const AddressType = {
  parse: ({ ast }) => ({
    addressKeyword: ast.addressKeyword.text,
    payableKeyword: ast.payableKeyword?.text
  }),
  print: ({ node }) => [
    node.addressKeyword,
    node.payableKeyword ? ` ${node.payableKeyword}` : ''
  ]
};
