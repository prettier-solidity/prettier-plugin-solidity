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

const comments = (node, path, options) =>
  node.comments &&
  // Trailing and leading comments are printed correctly by prettier.
  node.comments.filter(comment => !comment.trailing && !comment.leading).length
    ? concat([
        printComments(node, path, options),
        node.subNodes.length > 0 ? line : '' // separate with a line if subNodes follow
      ])
    : '';

const body = (node, path, options, print) =>
  node.subNodes.length > 0 || node.comments
    ? printSeparatedItem(
        concat([
          comments(node, path, options),
          printPreservingEmptyLines(path, 'subNodes', options, print)
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
