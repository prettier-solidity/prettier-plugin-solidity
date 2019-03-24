const {
  doc: {
    builders: { concat, line }
  }
} = require('prettier');

const LabelDefinition = {
  print: ({ node }) => concat([node.name, ':', line])
};

module.exports = LabelDefinition;
