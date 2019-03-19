const {
  doc: {
    builders: { concat }
  }
} = require('prettier');

// @TODO: handle scaping, single/double quotes, etc.
const StringLiteral = (node, path, options, print) =>
  concat(['"', node.value, '"']);
module.exports = StringLiteral;
