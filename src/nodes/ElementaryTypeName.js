const {
  doc: {
    builders: { concat }
  }
} = require('prettier/standalone');

const stateMutability = node => {
  if (node.stateMutability && node.stateMutability.length > 0) {
    return concat([' ', node.stateMutability]);
  }
  return '';
};

const ElementaryTypeName = {
  print: ({ node }) => concat([node.name, stateMutability(node)])
};

module.exports = ElementaryTypeName;
