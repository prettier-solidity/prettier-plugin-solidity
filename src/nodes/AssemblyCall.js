const {
  doc: {
    builders: { concat }
  }
} = require('prettier/standalone');

const printList = require('./print-list');

const AssemblyCall = {
  print: ({ node, path, print }) =>
    node.arguments.length === 0
      ? node.functionName
      : concat([
          node.functionName,
          '(',
          printList(path.map(print, 'arguments')),
          ')'
        ])
};

module.exports = AssemblyCall;
