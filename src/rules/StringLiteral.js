const {
  doc: {
    builders: { concat }
  }
} = require('prettier');

// @TODO: handle scaping, single/double quotes, etc.
const StringLiteral = node => concat(['"', node.value, '"']);
module.exports = StringLiteral;
