const {
  doc: {
    builders: { concat, group, indent, join, line, softline }
  }
} = require('prettier/standalone');

const printList = (
  list,
  firstSeparator = softline,
  separator = concat([',', line]),
  lastSeparator = firstSeparator
) =>
  group(
    concat([
      indent(concat([firstSeparator, join(separator, list)])),
      lastSeparator
    ])
  );

module.exports = printList;
