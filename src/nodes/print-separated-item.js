const {
  doc: {
    builders: { concat, indent, softline }
  }
} = require('prettier/standalone');

// This function will add an indentation to the `item` and separate it from the
// rest of the `doc` in most cases by a `softline`.
//
// NOTE: it doesn't `group` the resulting `doc` because single items can also be
// part of a larger structure.
const printSeparatedItem = (
  item,
  { firstSeparator = softline, lastSeparator = firstSeparator } = {}
) => concat([indent(concat([firstSeparator, item])), lastSeparator]);

module.exports = printSeparatedItem;
