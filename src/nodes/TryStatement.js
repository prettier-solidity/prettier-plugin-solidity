const {
  doc: {
    builders: { concat, group, indent, join, line }
  }
} = require('prettier/standalone');

const printList = require('./print-list');

const returnParameters = (node, path, print) =>
  node.returnParameters
    ? concat(['returns (', printList(path.map(print, 'returnParameters')), ')'])
    : '';

const TryStatement = {
  print: ({ node, path, print }) =>
    concat([
      group(
        concat([
          'try',
          indent(concat([line, path.call(print, 'expression')])),
          line,
          returnParameters(node, path, print)
        ])
      ),
      ' ',
      path.call(print, 'body'),
      ' ',
      join(' ', path.map(print, 'catchClauses'))
    ])
};

module.exports = TryStatement;
