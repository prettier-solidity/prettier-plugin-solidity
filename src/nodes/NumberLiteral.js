const {
  doc: {
    builders: { concat }
  }
} = require('prettier/standalone');

const NumberLiteral = {
  print: ({ node }) =>
    node.subdenomination
      ? concat([node.number, ' ', node.subdenomination])
      : node.number
};

module.exports = NumberLiteral;
