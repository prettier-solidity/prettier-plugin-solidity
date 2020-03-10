const {
  doc: {
    builders: { concat }
  }
} = require('prettier/standalone');

const printSeparatedList = require('./print-separated-list');

const modifierParameters = (node, path, print) => {
  if (node.parameters) {
    return node.parameters.length > 0
      ? concat(['(', printSeparatedList(path.map(print, 'parameters')), ')'])
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
