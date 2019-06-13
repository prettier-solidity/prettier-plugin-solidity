const {
  doc: {
    builders: { concat, group, indent, softline }
  }
} = require('prettier');

const WhileStatement = {
  print: ({ path, print }) =>
    concat([
      group(
        concat([
          'while (',
          indent(concat([softline, path.call(print, 'condition')])),
          softline,
          ') '
        ])
      ),
      path.call(print, 'body')
    ])
};

module.exports = WhileStatement;
