const {
  doc: {
    builders: { concat, indent, softline }
  }
} = require('prettier/standalone');

const printSeparatedItem = (
  item,
  { firstSeparator = softline, lastSeparator = firstSeparator } = {}
) => concat([indent(concat([firstSeparator, item])), lastSeparator]);

module.exports = printSeparatedItem;
