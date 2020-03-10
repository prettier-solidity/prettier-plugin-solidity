const {
  doc: {
    builders: { concat, group, line, hardline }
  }
} = require('prettier/standalone');

const printSeparatedItem = require('./print-separated-item');
const printSeparatedList = require('./print-separated-list');
const printPreservingEmptyLines = require('./print-preserving-empty-lines');
const printComments = require('./print-comments');

const inheritance = (node, path, print) =>
  node.baseContracts.length > 0
    ? concat([
        ' is',
        printSeparatedList(path.map(print, 'baseContracts'), {
          firstSeparator: line
        })
      ])
    : line;

const body = (node, path, options, print) =>
  node.subNodes.length > 0 || node.comments
    ? printSeparatedItem(
        concat([
          printPreservingEmptyLines(path, 'subNodes', options, print),
          printComments(node, path, options)
        ]),
        { firstSeparator: hardline }
      )
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
