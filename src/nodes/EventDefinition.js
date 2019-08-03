const {
  doc: {
    builders: { concat }
  }
} = require('prettier');

const EventDefinition = {
  print: ({ node, path, print }) =>
    concat(['event ', node.name, '(', path.call(print, 'parameters'), ');'])
};

module.exports = EventDefinition;
