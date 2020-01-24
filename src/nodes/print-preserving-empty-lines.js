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

    if (childPath.getName() > 0) {
      const nodeType = childPath.getValue().type;

      if (nodeType === 'ContractDefinition') {
        if (parts[parts.length - 2] !== hardline) {
          parts.push(hardline);
        }
        parts.push(hardline);
      }

      if (
        nodeType === 'FunctionDefinition' &&
        parts[parts.length - 2] !== hardline
      ) {
        parts.push(hardline);
      }
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

  if (parts.length > 1 && parts[parts.length - 1] === hardline) {
    parts.pop();
  }
  return concat(parts);
}

module.exports = printPreservingEmptyLines;
