const {
  doc: {
    builders: { concat, group, indent, line }
  }
} = require('prettier/standalone');

const printSeparatedItem = require('./print-separated-item');

const printBody = (node, path, print) =>
  node.body.type === 'Block'
    ? concat([' ', path.call(print, 'body'), ' '])
    : group(concat([indent(concat([line, path.call(print, 'body')])), line]));

const DoWhileStatement = {
  print: ({ node, path, print }) =>
    concat([
      'do',
      printBody(node, path, print),
      group(
        concat([
          'while (',
          printSeparatedItem(path.call(print, 'condition')),
          ');'
        ])
      )
    ])
};

module.exports = DoWhileStatement;
