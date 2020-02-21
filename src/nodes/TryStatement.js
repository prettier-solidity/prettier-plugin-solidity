const {
  doc: {
    builders: { concat, group, join, line }
  }
} = require('prettier/standalone');

const printSeparatedItem = require('./print-separated-item');
const printSeparatedList = require('./print-separated-list');

const returnParameters = (node, path, print) =>
  node.returnParameters
    ? concat([
        'returns (',
        printSeparatedList(path.map(print, 'returnParameters')),
        ')'
      ])
    : '';

const TryStatement = {
  print: ({ node, path, print }) =>
    concat([
      'try',
      group(
        printSeparatedItem(path.call(print, 'expression'), {
          firstSeparator: line
        })
      ),
      returnParameters(node, path, print),
      ' ',
      path.call(print, 'body'),
      ' ',
      join(' ', path.map(print, 'catchClauses'))
    ])
};

module.exports = TryStatement;
