const {
  doc: {
    builders: { concat, hardline }
  }
} = require('prettier/standalone');

const printSeparatedItem = require('./print-separated-item');
const printPreservingEmptyLines = require('./print-preserving-empty-lines');

const AssemblyBlock = {
  print: ({ options, path, print }) =>
    concat([
      '{',
      printSeparatedItem(
        printPreservingEmptyLines(path, 'operations', options, print),
        { firstSeparator: hardline }
      ),
      '}'
    ])
};

module.exports = AssemblyBlock;
