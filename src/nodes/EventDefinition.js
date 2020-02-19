const {
  doc: {
    builders: { concat }
  }
} = require('prettier/standalone');

const printList = require('./print-list');

const parameters = (node, path, print) =>
  node.parameters && node.parameters.length > 0
    ? printList(path.map(print, 'parameters'))
    : '';

const EventDefinition = {
  print: ({ node, path, print }) =>
    concat(['event ', node.name, '(', parameters(node, path, print), ');'])
};

module.exports = EventDefinition;
