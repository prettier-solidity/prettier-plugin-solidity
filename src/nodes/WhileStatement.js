const {
  doc: {
    builders: { concat, group, indent, line }
  }
} = require('prettier/standalone');

const printList = require('./print-list');

const printBody = (node, path, print) =>
  node.body.type === 'Block'
    ? concat([' ', path.call(print, 'body')])
    : group(indent(concat([line, path.call(print, 'body')])));

const WhileStatement = {
  print: ({ node, path, print }) =>
    concat([
      'while (',
      printList([path.call(print, 'condition')]),
      ')',
      printBody(node, path, print)
    ])
};

module.exports = WhileStatement;
