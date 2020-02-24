const {
  doc: {
    builders: { concat, group, indent, line }
  }
} = require('prettier/standalone');

const printList = require('./print-list');
const printPreservingEmptyLines = require('./print-preserving-empty-lines');

const inheritance = (node, path, print) =>
  node.baseContracts.length > 0
    ? concat([
        ' is',
        printList(path.map(print, 'baseContracts'), { firstSeparator: line })
      ])
    : line;

const body = (node, path, options, print) =>
  node.subNodes.length > 0
    ? concat([
        indent(line),
        indent(printPreservingEmptyLines(path, 'subNodes', options, print)),
        line
      ])
    : '';

const ContractDefinition = {
  print: ({ node, options, path, print }) =>
    concat([
      group(
        concat([
          node.kind === 'abstract' ? 'abstract contract' : node.kind,
          ' ',
          node.name,
          inheritance(node, path, print),
          '{'
        ])
      ),
      body(node, path, options, print),
      '}'
    ])
};

module.exports = ContractDefinition;
