const {
  doc: {
    builders: { concat, group }
  }
} = require('prettier/standalone');

const printList = require('./print-list');

const CatchClause = {
  print: ({ node, path, print }) => {
    return group(
      concat([
        'catch ',
        node.isReasonStringType ? 'Error' : '',
        '(',
        printList(path.map(print, 'parameters')),
        ') ',
        path.call(print, 'body')
      ])
    );
  }
};

module.exports = CatchClause;
