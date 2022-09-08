const {
  doc: {
    builders: { group, indent, join, line, softline }
  }
} = require('prettier');

const separatedList = (list, firstSeparator, separator, lastSeparator) => [
  indent([firstSeparator, join(separator, list)]),
  lastSeparator
];

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
) =>
  grouped
    ? group(separatedList(list, firstSeparator, separator, lastSeparator))
    : separatedList(list, firstSeparator, separator, lastSeparator);
module.exports = printSeparatedList;
