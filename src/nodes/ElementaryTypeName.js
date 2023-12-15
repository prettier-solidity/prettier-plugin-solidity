const stateMutability = (node) =>
  node.stateMutability?.length > 0 ? [' ', node.stateMutability] : '';

export const ElementaryTypeName = {
  print: ({ node }) => [node.name, stateMutability(node)]
};
