const {
  doc: {
    builders: { concat }
  }
} = require('prettier/standalone');

const stateMutability = (node) =>
  node.stateMutability && node.stateMutability.length > 0
    ? concat([' ', node.stateMutability])
    : '';

const ElementaryTypeName = {
  print: ({ node }) => concat([node.name, stateMutability(node)])
};

module.exports = ElementaryTypeName;
