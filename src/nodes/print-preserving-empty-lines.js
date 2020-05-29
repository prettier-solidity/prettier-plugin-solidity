const {
  doc: {
    builders: { concat, hardline }
  },
  util: { isNextLineEmptyAfterIndex }
} = require('prettier/standalone');

function printPreservingEmptyLines(path, key, options, print) {
  const parts = [];
  path.each((childPath) => {
    const node = childPath.getValue();
    const nodeType = node.type;

    if (parts.length !== 0) {
      parts.push(hardline);
    }

    if (childPath.getName() > 0) {
      if (
        ['ContractDefinition', 'FunctionDefinition'].includes(nodeType) &&
        parts[parts.length - 2] !== hardline
      ) {
        parts.push(hardline);
      }
    }

    parts.push(print(childPath));

    if (
      isNextLineEmptyAfterIndex(
        options.originalText,
        options.locEnd(node) + 1
      ) ||
      nodeType === 'FunctionDefinition'
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
