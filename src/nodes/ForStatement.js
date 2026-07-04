import { doc } from 'prettier';
import { printSeparatedItem } from '../common/printer-helpers.js';

const { group, indent, line } = doc.builders;

const initExpression = (node, path, print) => [
  node.initExpression ? path.call(print, 'initExpression') : '',
  ';'
];

const conditionExpression = (node, path, print) => [
  node.conditionExpression ? path.call(print, 'conditionExpression') : '',
  ';'
];

const printBody = (node, path, print) =>
  node.body.type === 'Block'
    ? [' ', path.call(print, 'body')]
    : group(indent([line, path.call(print, 'body')]));

export const ForStatement = {
  print: ({ node, path, print }) => [
    'for (',
    printSeparatedItem(
      node.loopExpression.expression
        ? [
            initExpression(node, path, print),
            line,
            conditionExpression(node, path, print),
            line,
            path.call(print, 'loopExpression')
          ]
        : [
            initExpression(node, path, print),
            node.initExpression || node.conditionExpression ? line : '',
            conditionExpression(node, path, print)
          ]
    ),
    ')',
    printBody(node, path, print)
  ]
};
