const {
  doc: {
    builders: { concat }
  }
} = require('prettier/standalone');

const printSeparatedList = require('./print-separated-list');

const parameters = (node, path, print) =>
  node.parameters
    ? concat([
        node.isReasonStringType ? 'Error' : '',
        '(',
        printSeparatedList(path.map(print, 'parameters')),
        ') '
      ])
    : '';

const CatchClause = {
  print: ({ node, path, print }) =>
    concat(['catch ', parameters(node, path, print), path.call(print, 'body')])
};

module.exports = CatchClause;
