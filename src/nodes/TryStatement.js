const {
  doc: {
    builders: { concat, group, indent, join, line, softline }
  }
} = require('prettier/standalone');

const returnParameters = (node, path, print) => {
  if (node.returnParameters) {
    return concat([
      'returns (',
      group(
        concat([
          indent(
            concat([
              softline,
              join(concat([',', line]), path.map(print, 'returnParameters'))
            ])
          ),
          softline
        ])
      ),
      ')'
    ]);
  }
  return '';
};

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
