const {
  doc: {
    builders: { line }
  }
} = require('prettier');

const { printPreservingEmptyLines } = require('../common/printer-helpers');

const SourceUnit = {
  print: ({ options, path, print }) => [
    printPreservingEmptyLines(path, 'children', options, print),
    options.parentParser ? '' : line
  ]
};

module.exports = SourceUnit;
