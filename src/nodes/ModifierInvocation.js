const {
  doc: {
    builders: { concat, group }
  }
} = require('prettier/standalone');

const printList = require('./print-list');

const modifierArguments = (node, path, print) => {
  if (node.arguments) {
    return node.arguments.length > 0
      ? group(concat(['(', printList(path.map(print, 'arguments')), ')']))
      : '()';
  }

  return '';
};

const ModifierInvocation = {
  print: ({ node, path, print }) =>
    concat([node.name, modifierArguments(node, path, print)])
};

module.exports = ModifierInvocation;
