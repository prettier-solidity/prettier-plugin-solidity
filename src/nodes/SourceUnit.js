const {
  builders: { line }
} = require('prettier/doc');

const printPreservingEmptyLines = require('./print-preserving-empty-lines');

const SourceUnit = {
  print: ({ options, path, print }) => [
    printPreservingEmptyLines(path, 'children', options, print),
    line
  ]
};

module.exports = SourceUnit;
