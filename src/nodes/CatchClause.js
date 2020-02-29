const {
  doc: {
    builders: { concat, group }
  }
} = require('prettier/standalone');

const printList = require('./print-list');

const parameters = (node, path, print) =>
  node.parameters
    ? concat([
        node.isReasonStringType ? 'Error' : '',
        '(',
        printList(path.map(print, 'parameters')),
        ') '
      ])
    : '';

const CatchClause = {
  print: ({ node, path, print }) =>
    group(
      concat([
        'catch ',
        parameters(node, path, print),
        path.call(print, 'body')
      ])
    )
};

module.exports = CatchClause;
