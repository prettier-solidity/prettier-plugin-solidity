const {
  doc: {
    builders: { concat, hardline }
  },
  util: { isNextLineEmptyAfterIndex }
} = require('prettier/standalone');

function printPreservingEmptyLines(path, key, options, print) {
  const parts = [];
  path.each(childPath => {
    if (parts.length !== 0) {
      parts.push(hardline);
    }

    parts.push(print(childPath));
    if (
      isNextLineEmptyAfterIndex(
        options.originalText,
        options.locEnd(childPath.getValue()) + 1
      )
    ) {
      parts.push(hardline);
    }
  }, key);

  return concat(parts);
}

module.exports = printPreservingEmptyLines;
