const {
  doc: {
    builders: { concat }
  }
} = require('prettier');

const EventDefinition = (node, path, options, print) =>
  concat(['event ', node.name, '(', path.call(print, 'parameters'), ');']);

module.exports = EventDefinition;
