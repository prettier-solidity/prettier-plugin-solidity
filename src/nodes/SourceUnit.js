const {
  doc: {
    builders: { concat, line }
  }
} = require('prettier/standalone');

const printPreservingEmptyLines = require('./print-preserving-empty-lines');

const SourceUnit = {
  print: ({ options, path, print }) =>
    concat([printPreservingEmptyLines(path, 'children', options, print), line])
};

module.exports = SourceUnit;
