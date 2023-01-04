const {
  doc: {
    builders: { hardline }
  }
} = require('prettier');

const {
  printComments,
  printPreservingEmptyLines,
  printSeparatedItem
} = require('../common/printer-helpers');

const AssemblyBlock = {
  print: ({ node, options, path, print }) => [
    '{',
    printSeparatedItem(
      [
        printPreservingEmptyLines(path, 'operations', options, print),
        printComments(node, path, options)
      ],
      { firstSeparator: hardline, grouped: false }
    ),
    '}'
  ]
};

module.exports = AssemblyBlock;
