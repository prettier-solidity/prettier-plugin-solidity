const {
  doc: {
    builders: { group, hardline }
  }
} = require('prettier');

const { printSeparatedList } = require('../common/printer-helpers');

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
