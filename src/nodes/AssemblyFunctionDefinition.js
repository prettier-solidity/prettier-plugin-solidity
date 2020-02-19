const {
  doc: {
    builders: { concat, join }
  }
} = require('prettier/standalone');

const printList = require('./print-list');

const AssemblyFunctionDefinition = {
  print: ({ node, path, print }) =>
    concat([
      'function ',
      node.name,
      '(',
      printList(path.map(print, 'arguments')),
      ')',
      ' -> ',
      join(', ', path.map(print, 'returnArguments')),
      ' ',
      path.call(print, 'body')
    ])
};

module.exports = AssemblyFunctionDefinition;
