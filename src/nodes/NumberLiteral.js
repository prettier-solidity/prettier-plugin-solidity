const {
  doc: {
    builders: { join }
  }
} = require('prettier');

const NumberLiteral = {
  print: ({ node }) => {
    if (node.subdenomination) {
      return join(' ', [node.number, node.subdenomination]);
    }
    return node.number;
  }
};

module.exports = NumberLiteral;
