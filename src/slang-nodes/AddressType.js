export const AddressType = {
  parse: ({ ast }) => ({
    kind: ast.cst.kind,
    addressKeyword: ast.addressKeyword.text,
    payableKeyword: ast.payableKeyword?.text
  }),
  // TODO: implement print
  print: () => ['TODO: AddressType']
};
