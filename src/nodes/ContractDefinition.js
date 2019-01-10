const {
  doc: {
    builders: { concat, indent, join, line }
  }
} = require('prettier');
const printPreservingEmptyLines = require('./print-preserving-empty-lines');

const ContractDefinition = {
  print: ({ node, options, path, print }) => {
    let parts = [node.kind, ' ', node.name];

    if (node.baseContracts.length > 0) {
      parts = parts.concat([
        ' is ',
        join(', ', path.map(print, 'baseContracts'))
      ]);
    }

    parts.push(' {');
    if (node.subNodes.length > 0) {
      parts = parts.concat([
        indent(line),
        indent(printPreservingEmptyLines(path, 'subNodes', options, print)),
        line
      ]);
    }
    parts.push('}');

    return concat(parts);
  }
};

module.exports = ContractDefinition;
