const {
  doc: {
    builders: { concat, group, indent, line, softline }
  }
} = require('prettier/standalone');

const printBody = (node, path, print) =>
  node.body.type === 'Block'
    ? concat([' ', path.call(print, 'body')])
    : group(indent(concat([line, path.call(print, 'body')])));

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
          ')'
        ])
      ),
      printBody(node, path, print)
    ])
};

module.exports = ForStatement;
