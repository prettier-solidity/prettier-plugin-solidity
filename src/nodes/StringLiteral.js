const { printString } = require('../prettier-comments/common/util');

// @TODO: handle scaping, single/double quotes, etc.
const StringLiteral = {
  print: ({ node, options }) => printString(node.value, options)
};

module.exports = StringLiteral;
