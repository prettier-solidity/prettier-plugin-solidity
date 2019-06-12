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
