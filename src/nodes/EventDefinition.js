const { printSeparatedList } = require('../common/printer-helpers');

const parameters = (node, path, print) =>
  node.parameters && node.parameters.length > 0
    ? printSeparatedList(path.map(print, 'parameters'))
    : '';

const EventDefinition = {
  print: ({ node, path, print }) => [
    'event ',
    node.name,
    '(',
    parameters(node, path, print),
    ')',
    node.isAnonymous ? ' anonymous' : '',
    ';'
  ]
};

module.exports = EventDefinition;
