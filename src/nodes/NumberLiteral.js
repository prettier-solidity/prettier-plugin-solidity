export const NumberLiteral = {
  print: ({ node }) =>
    node.subdenomination
      ? [node.number, ' ', node.subdenomination]
      : node.number
};
