const {
  doc: {
    builders: { concat }
  }
} = require('prettier/standalone');

// @TODO: handle scaping, single/double quotes, etc.
const StringLiteral = {
  print: ({ node }) => concat(['"', node.value, '"'])
};

module.exports = StringLiteral;
