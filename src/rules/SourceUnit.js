const {
  doc: {
    builders: { concat, line }
  }
} = require('prettier');

const printPreservingEmptyLines = require('./builders/printPreservingEmptyLines');

const SourceUnit = (node, path, options, print) => {
  return concat([
    printPreservingEmptyLines(path, 'children', options, print),
    line
  ]);
};

module.exports = SourceUnit;
