export const ImportAlias = {
  parse: ({ node, offsets, ast }) => ({
    ...node,
    asKeyword: ast.asKeyword.text,
    identifier: ast.identifier.text
  }),
  print: ({ node }) => ` ${node.asKeyword} ${node.identifier}`
};
