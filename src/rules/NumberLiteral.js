const {
  doc: {
    builders: { join }
  }
} = require('prettier');

const NumberLiteral = (node, path, options, print) => {
  if (node.subdenomination) {
    return join(' ', [node.number, node.subdenomination]);
  }
  return node.number;
};

module.exports = NumberLiteral;
