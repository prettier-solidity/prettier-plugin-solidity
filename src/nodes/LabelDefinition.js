const {
  doc: {
    builders: { concat, dedent, line }
  }
} = require('prettier/standalone');

const LabelDefinition = {
  print: ({ node }) => concat([dedent(line), node.name, ':'])
};

module.exports = LabelDefinition;
