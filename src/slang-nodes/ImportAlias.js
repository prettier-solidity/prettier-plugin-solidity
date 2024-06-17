export const ImportAlias = {
  parse: ({ node, ast }) => ({
    ...node,
    asKeyword: ast.asKeyword.text,
    identifier: ast.identifier.text
  }),
  print: ({ node }) => ` ${node.asKeyword} ${node.identifier}`
};
