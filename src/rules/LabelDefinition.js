const {
  doc: {
    builders: { concat }
  }
} = require('prettier');

const LabelDefinition = (node, path, options, print) =>
  concat([node.name, ':', line]);

module.exports = LabelDefinition;
