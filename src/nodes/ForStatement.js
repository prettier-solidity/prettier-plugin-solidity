/* eslint-disable implicit-arrow-linebreak */
const {
  doc: {
    builders: { concat, group, indent, line, softline }
  }
} = require('prettier');

const ForStatement = {
  print: ({ node, path, print }) =>
    concat([
      group(
        concat([
          'for (',
          indent(
            concat([
              softline,
              node.initExpression ? path.call(print, 'initExpression') : '',
              ';',
              line,
              node.conditionExpression
                ? path.call(print, 'conditionExpression')
                : '',
              ';',
              line,
              path.call(print, 'loopExpression')
            ])
          ),
          softline,
          ') '
        ])
      ),
      path.call(print, 'body')
    ])
};

module.exports = ForStatement;
