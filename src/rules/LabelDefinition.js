const {
  doc: {
    builders: { concat, line }
  }
} = require('prettier');

const LabelDefinition = node => concat([node.name, ':', line]);

module.exports = LabelDefinition;
