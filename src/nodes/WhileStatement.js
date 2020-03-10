const {
  doc: {
    builders: { concat, group, indent, line }
  }
} = require('prettier/standalone');

const printSeparatedItem = require('./print-separated-item');

const printBody = (node, path, print) =>
  node.body.type === 'Block'
    ? concat([' ', path.call(print, 'body')])
    : group(indent(concat([line, path.call(print, 'body')])));

const WhileStatement = {
  print: ({ node, path, print }) =>
    concat([
      group(
        concat([
          'while (',
          printSeparatedItem(path.call(print, 'condition')),
          ')'
        ])
      ),
      printBody(node, path, print)
    ])
};

module.exports = WhileStatement;
