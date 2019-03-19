/* eslint-disable implicit-arrow-linebreak */
const {
  doc: {
    builders: { concat, hardline, indent }
  }
} = require('prettier');

const printPreservingEmptyLines = require('./builders/printPreservingEmptyLines');

const AssemblyAssignment = (node, path, options, print) =>
  concat([
    '{',
    indent(hardline),
    indent(printPreservingEmptyLines(path, 'operations', options, print)),
    hardline,
    '}'
  ]);

module.exports = AssemblyAssignment;
