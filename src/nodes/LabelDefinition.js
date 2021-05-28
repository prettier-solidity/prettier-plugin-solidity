const {
  doc: {
    builders: { dedent, line }
  }
} = require('prettier/standalone');

const LabelDefinition = {
  print: ({ node }) => [dedent(line), node.name, ':']
};

module.exports = LabelDefinition;
