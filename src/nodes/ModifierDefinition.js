const {
  doc: {
    builders: { concat, hardline, line }
  }
} = require('prettier/standalone');

const printSeparatedList = require('./print-separated-list');

const modifierParameters = (node, path, print) => {
  if (node.parameters) {
    return node.parameters.length > 0
      ? concat([
          '(',
          printSeparatedList(path.map(print, 'parameters'), {
            separator: concat([
              ',',
              // To keep consistency any list of parameters will split if it's longer than 2.
              // For more information see:
              // https://github.com/prettier-solidity/prettier-plugin-solidity/issues/256
              node.parameters.length > 2 ? hardline : line
            ])
          }),
          ')'
        ])
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
