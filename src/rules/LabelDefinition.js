const {
  doc: {
    builders: { concat }
  }
} = require('prettier');

const LabelDefinition = (node, path, options, print) => {
  return concat([node.name, ':', line]);
};

module.exports = LabelDefinition;
