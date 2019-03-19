const {
  doc: {
    builders: { concat }
  }
} = require('prettier');

const PragmaDirective = (node, path, options, print) => {
  return concat(['pragma ', node.name, ' ', node.value, ';']);
};

module.exports = PragmaDirective;
