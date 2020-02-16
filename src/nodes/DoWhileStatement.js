const {
  doc: {
    builders: { concat, group, indent, line, softline }
  }
} = require('prettier/standalone');

const printBody = (node, path, print) => {
  if (node.body.type === 'Block') {
    return concat([' ', path.call(print, 'body')]);
  }

  return group(indent(concat([line, path.call(print, 'body')])));
};

const DoWhileStatement = {
  print: ({ node, path, print }) =>
    concat([
      'do',
      printBody(node, path, print),
      ' while (',
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
