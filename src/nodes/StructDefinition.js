const {
  doc: {
    builders: { hardline }
  }
} = require('prettier');

const { printSeparatedList } = require('../common/printer-helpers');

const StructDefinition = {
  print: ({ node, path, print }) => [
    'struct ',
    node.name,
    ' {',
    node.members.length > 0
      ? printSeparatedList(path.map(print, 'members'), {
          firstSeparator: hardline,
          separator: [';', hardline],
          lastSeparator: [';', hardline]
        })
      : '',
    '}'
  ]
};

module.exports = StructDefinition;
