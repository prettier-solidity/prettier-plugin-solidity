const {
  doc: {
    builders: { concat, group }
  }
} = require('prettier/standalone');

const printList = require('./print-list');

const modifierParameters = (node, path, print) => {
  if (node.parameters) {
    return node.parameters.length > 0
      ? group(concat(['(', printList(path.map(print, 'parameters')), ')']))
      : '()';
  }

  return '';
};

const ModifierDefinition = {
  print: ({ node, path, print }) =>
    concat([
      'modifier ',
      node.name,
      modifierParameters(node, path, print),
      ' ',
      path.call(print, 'body')
    ])
};

module.exports = ModifierDefinition;
