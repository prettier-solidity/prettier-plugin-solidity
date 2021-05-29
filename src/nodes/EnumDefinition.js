const {
  doc: {
    builders: { group, hardline }
  }
} = require('prettier/standalone');

const printSeparatedList = require('./print-separated-list');

const EnumDefinition = {
  print: ({ node, path, print }) =>
    group([
      'enum ',
      node.name,
      ' {',
      printSeparatedList(path.map(print, 'members'), {
        firstSeparator: hardline
      }),
      '}'
    ])
};

module.exports = EnumDefinition;
