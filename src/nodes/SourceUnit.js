const {
  doc: {
    builders: { line }
  }
} = require('prettier');

const printPreservingEmptyLines = require('./print-preserving-empty-lines');

const SourceUnit = {
  print: ({ options, path, print }) => [
    printPreservingEmptyLines(path, 'children', options, print),
    options.parentParser ? '' : line
  ]
};

module.exports = SourceUnit;
