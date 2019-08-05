const { printString } = require('../prettier-comments/common/util');

const StringLiteral = {
  print: ({ node, options }) => printString(node.value, options)
};

module.exports = StringLiteral;
