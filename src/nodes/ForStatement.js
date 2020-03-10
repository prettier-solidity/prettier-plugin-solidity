const {
  doc: {
    builders: { concat, group, indent, line }
  }
} = require('prettier/standalone');

const printSeparatedList = require('./print-separated-list');

const initExpression = (node, path, print) =>
  node.initExpression ? path.call(print, 'initExpression') : '';

const conditionExpression = (node, path, print) =>
  node.conditionExpression ? path.call(print, 'conditionExpression') : '';

const loopExpression = (node, path, print) =>
  node.loopExpression.expression ? path.call(print, 'loopExpression') : '';

const printBody = (node, path, print) =>
  node.body.type === 'Block'
    ? concat([' ', path.call(print, 'body')])
    : group(indent(concat([line, path.call(print, 'body')])));

const ForStatement = {
  print: ({ node, path, print }) =>
    concat([
      'for (',
      printSeparatedList(
        [
          initExpression(node, path, print),
          conditionExpression(node, path, print),
          loopExpression(node, path, print)
        ],
        {
          separator:
            node.initExpression ||
            node.conditionExpression ||
            node.loopExpression.expression
              ? concat([';', line])
              : ';'
        }
      ),
      ')',
      printBody(node, path, print)
    ])
};

module.exports = ForStatement;
