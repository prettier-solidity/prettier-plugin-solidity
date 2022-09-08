const {
  doc: {
    builders: { group, indent, join, line, softline }
  }
} = require('prettier');

// This function will add an indentation to the `list` and separate it from the
// rest of the `doc` in most cases by a `softline`.
// the list itself will be printed with a separator that in most cases is a
// comma (,) and a `line`
const printSeparatedList = (
  list,
  {
    firstSeparator = softline,
    separator = [',', line],
    lastSeparator = firstSeparator,
    grouped = true
  } = {}
) => {
  const doc = [indent([firstSeparator, join(separator, list)]), lastSeparator];
  return grouped ? group(doc) : doc;
};
module.exports = printSeparatedList;
