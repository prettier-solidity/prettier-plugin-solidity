const {
  doc: {
    builders: { join, line }
  }
} = require('prettier');

const {
  printSeparatedItem,
  printSeparatedList
} = require('../common/printer-helpers');

const returnParameters = (node, path, print) =>
  node.returnParameters
    ? [
        'returns (',
        printSeparatedList(path.map(print, 'returnParameters')),
        ')'
      ]
    : '';

const TryStatement = {
  print: ({ node, path, print }) => {
    let parts = [
      'try',
      printSeparatedItem(path.call(print, 'expression'), {
        firstSeparator: line
      })
    ];

    const formattedReturnParameters = returnParameters(node, path, print);
    if (formattedReturnParameters) {
      parts = parts.concat([formattedReturnParameters, ' ']);
    }

    parts = parts.concat([
      path.call(print, 'body'),
      ' ',
      join(' ', path.map(print, 'catchClauses'))
    ]);

    return parts;
  }
};

module.exports = TryStatement;
