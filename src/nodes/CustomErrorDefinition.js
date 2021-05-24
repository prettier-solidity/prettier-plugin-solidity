const {
  doc: {
    builders: { concat }
  }
} = require('prettier/standalone');

const printSeparatedList = require('./print-separated-list');

const parameters = (node, path, print) =>
  node.parameters && node.parameters.length > 0
    ? printSeparatedList(path.map(print, 'parameters'))
    : '';

const CustomErrorDefinition = {
  print: ({ node, path, print }) =>
    concat(['error ', node.name, '(', parameters(node, path, print), ');'])
};

module.exports = CustomErrorDefinition;
