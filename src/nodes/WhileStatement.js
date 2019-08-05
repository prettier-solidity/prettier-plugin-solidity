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

const WhileStatement = {
  print: ({ node, path, print }) =>
    concat([
      group(
        concat([
          'while (',
          indent(concat([softline, path.call(print, 'condition')])),
          softline,
          ')'
        ])
      ),
      printBody(node, path, print)
    ])
};

module.exports = WhileStatement;
