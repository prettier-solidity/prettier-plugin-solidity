const {
  doc: {
    builders: { concat, group }
  }
} = require('prettier/standalone');

const printList = require('./print-list');

const printArguments = (node, path, print) =>
  node.arguments && node.arguments.length
    ? group(concat(['(', printList(path.map(print, 'arguments')), ')']))
    : '';

const InheritanceSpecifier = {
  print: ({ node, path, print }) =>
    concat([path.call(print, 'baseName'), printArguments(node, path, print)])
};

module.exports = InheritanceSpecifier;
