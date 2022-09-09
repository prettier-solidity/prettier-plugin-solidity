const {
  doc: {
    builders: { group, indent, softline }
  }
} = require('prettier');

// This function will add an indentation to the `item` and separate it from the
// rest of the `doc` in most cases by a `softline`.
const printSeparatedItem = (
  item,
  {
    firstSeparator = softline,
    lastSeparator = firstSeparator,
    grouped = true
  } = {}
) => {
  const doc = [indent([firstSeparator, item]), lastSeparator];
  return grouped ? group(doc) : doc;
};

module.exports = printSeparatedItem;
