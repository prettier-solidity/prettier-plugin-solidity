const {
  doc: {
    builders: { concat, group, ifBreak, indent, line, softline }
  }
} = require('prettier');

const printBody = (node, path, print) => {
  if (node.body.type === 'Block') {
    return concat([' ', path.call(print, 'body')]);
  }

  return group(
    concat([
      ifBreak(concat([' {']), ''),
      indent(concat([line, path.call(print, 'body')])),
      ifBreak(concat([line, '}']), '')
    ])
  );
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
