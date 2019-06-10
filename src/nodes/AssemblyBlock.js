const {
  doc: {
    builders: { concat, hardline, indent }
  }
} = require('prettier/standalone');

const printPreservingEmptyLines = require('./print-preserving-empty-lines');

const AssemblyBlock = {
  print: ({ options, path, print }) =>
    concat([
      '{',
      indent(hardline),
      indent(printPreservingEmptyLines(path, 'operations', options, print)),
      hardline,
      '}'
    ])
};

module.exports = AssemblyBlock;
