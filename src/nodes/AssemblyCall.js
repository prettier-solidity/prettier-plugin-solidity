const {
  doc: {
    builders: { concat }
  }
} = require('prettier/standalone');

const printList = require('./print-list');

const AssemblyCall = {
  print: ({ node, path, print, options }) =>
    node.arguments.length === 0 &&
    options.originalText.charAt(options.locEnd(node)) !== ')'
      ? node.functionName
      : concat([
          node.functionName,
          '(',
          printList(path.map(print, 'arguments')),
          ')'
        ])
};

module.exports = AssemblyCall;
