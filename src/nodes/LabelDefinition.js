const {
  doc: {
    builders: { concat, line }
  }
} = require('prettier/standalone');

const LabelDefinition = {
  print: ({ node }) => concat([node.name, ':', line])
};

module.exports = LabelDefinition;
