const {
  builders: { dedent, line }
} = require('prettier/doc');

const LabelDefinition = {
  print: ({ node }) => [dedent(line), node.name, ':']
};

module.exports = LabelDefinition;
