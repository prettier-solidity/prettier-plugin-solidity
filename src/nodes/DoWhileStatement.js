const {
  doc: {
    builders: { concat, group, indent, line, softline }
  }
} = require('prettier/standalone');

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
      group(
        concat([
          indent(concat([softline, path.call(print, 'condition')])),
          softline
        ])
      ),
      ');'
    ])
};

module.exports = DoWhileStatement;
