const {
  doc: {
    builders: { concat }
  }
} = require('prettier');

const PragmaDirective = (node, path, options, print) =>
  concat(['pragma ', node.name, ' ', node.value, ';']);

module.exports = PragmaDirective;
