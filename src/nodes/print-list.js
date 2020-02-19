const {
  doc: {
    builders: { concat, group, indent, join, line, softline }
  }
} = require('prettier/standalone');

const printList = (
  list,
  edgeSeparator = softline,
  separator = concat([',', line])
) =>
  group(
    concat([
      indent(concat([edgeSeparator, join(separator, list)])),
      edgeSeparator
    ])
  );

module.exports = printList;
