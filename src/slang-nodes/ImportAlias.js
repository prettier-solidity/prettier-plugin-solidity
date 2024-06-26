export const ImportAlias = {
  parse: ({ ast }) => ({
    asKeyword: ast.asKeyword.text,
    identifier: ast.identifier.text
  }),
  print: ({ node }) => ` ${node.asKeyword} ${node.identifier}`
};
