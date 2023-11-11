const stateMutability = (node) =>
  node.stateMutability ? [' ', node.stateMutability] : '';

export const ElementaryTypeName = {
  print: ({ node }) => [node.name, stateMutability(node)]
};
