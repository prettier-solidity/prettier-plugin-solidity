const {
  doc: {
    builders: { concat, group, join }
  }
} = require('prettier/standalone');

const TryStatement = {
  print: ({ node, path, print }) =>
    group(
      concat([
        'try ',
        path.call(print, 'expression'),
        node.returnParameters
          ? concat([
              ' returns (',
              join(' ', path.map(print, 'returnParameters')),
              ')'
            ])
          : '',
        ' ',
        path.call(print, 'body'),
        ' ',
        join(' ', path.map(print, 'catchClauses'))
      ])
    )
};

module.exports = TryStatement;
