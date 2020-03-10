const {
  doc: {
    builders: { concat, hardline }
  }
} = require('prettier/standalone');

const printSeparatedList = require('./print-separated-list');

const StructDefinition = {
  print: ({ node, path, print }) =>
    concat([
      'struct ',
      node.name,
      ' {',
      printSeparatedList(path.map(print, 'members'), {
        firstSeparator: hardline,
        separator: concat([';', hardline]),
        lastSeparator: concat([';', hardline])
      }),
      '}'
    ])
};

module.exports = StructDefinition;
