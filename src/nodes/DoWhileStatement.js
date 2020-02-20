const {
  doc: {
    builders: { concat, group, indent, line }
  }
} = require('prettier/standalone');

const printList = require('./print-list');

const printBody = (node, path, print) =>
  node.body.type === 'Block'
    ? concat([' ', path.call(print, 'body'), ' '])
    : group(concat([indent(concat([line, path.call(print, 'body')])), line]));

const DoWhileStatement = {
  print: ({ node, path, print }) =>
    concat([
      'do',
      printBody(node, path, print),
      'while (',
      printList([path.call(print, 'condition')]),
      ');'
    ])
};

module.exports = DoWhileStatement;
