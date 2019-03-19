const {
  doc: {
    builders: { concat, indent, join, line }
  }
} = require('prettier');

const printPreservingEmptyLines = require('./builders/printPreservingEmptyLines');

const ContractDefinition = (node, path, options, print) => {
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
};

module.exports = ContractDefinition;
