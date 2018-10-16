/* eslint-disable implicit-arrow-linebreak */
const printPreservingEmptyLines = require('./print-preserving-empty-lines');

const SourceUnit = {
  print: ({ options, path, print }) =>
    printPreservingEmptyLines(path, 'children', options, print)
};

module.exports = SourceUnit;
