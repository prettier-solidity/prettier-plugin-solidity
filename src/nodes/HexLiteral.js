const {
  doc: {
    builders: { join, line }
  }
} = require('prettier');

const { printString } = require('../common/util');

const HexLiteral = {
  print: ({ node, options }) => {
    const list = node.parts.map((part) => `hex${printString(part, options)}`);
    return join(line, list);
  }
};

module.exports = HexLiteral;
