const {
  doc: {
    builders: { join, line }
  }
} = require('prettier/standalone');
const { printString } = require('../prettier-comments/common/util');

const StringLiteral = {
  print: ({ node, options }) => {
    const list = node.parts.map((part, index) =>
      printString(part, {
        ...options,
        // node.isUnicode is an array of the same length as node.parts
        // that indicates if that string fragment has the unicode prefix
        isUnicode: node.isUnicode[index]
      })
    );

    return join(line, list);
  }
};

module.exports = StringLiteral;
