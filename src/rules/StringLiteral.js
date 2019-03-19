const {
  doc: {
    builders: { concat }
  }
} = require('prettier');

const StringLiteral = (node, path, options, print) => {
  // @TODO: handle scaping, single/double quotes, etc.
  return concat(['"', node.value, '"']);
};

module.exports = StringLiteral;
