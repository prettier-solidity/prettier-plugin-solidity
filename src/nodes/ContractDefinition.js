const {
  doc: {
    builders: { group, line, hardline }
  }
} = require('prettier');

const {
  printComments,
  printPreservingEmptyLines,
  printSeparatedItem,
  printSeparatedList
} = require('../common/printer-helpers');

const inheritance = (node, path, print) =>
  node.baseContracts.length > 0
    ? [
        ' is',
        printSeparatedList(path.map(print, 'baseContracts'), {
          firstSeparator: line
        })
      ]
    : line;

const body = (node, path, options, print) => {
  const comments = printComments(node, path, options);
  return node.subNodes.length > 0 || (comments && comments.length)
    ? printSeparatedItem(
        [printPreservingEmptyLines(path, 'subNodes', options, print), comments],
        { firstSeparator: hardline, grouped: false }
      )
    : '';
};

const ContractDefinition = {
  print: ({ node, options, path, print }) => [
    group([
      node.kind === 'abstract' ? 'abstract contract' : node.kind,
      ' ',
      node.name,
      inheritance(node, path, print),
      '{'
    ]),
    body(node, path, options, print),
    '}'
  ]
};

module.exports = ContractDefinition;
