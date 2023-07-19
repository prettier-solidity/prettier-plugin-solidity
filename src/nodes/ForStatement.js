import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers.js';

const { group, indent, line } = doc.builders;

const initExpression = (node, path, print) =>
  node.initExpression ? path.call(print, 'initExpression') : '';

const conditionExpression = (node, path, print) =>
  node.conditionExpression ? path.call(print, 'conditionExpression') : '';

const loopExpression = (node, path, print) =>
  node.loopExpression.expression ? path.call(print, 'loopExpression') : '';

const printBody = (node, path, print) =>
  node.body.type === 'Block'
    ? [' ', path.call(print, 'body')]
    : group(indent([line, path.call(print, 'body')]));

export const ForStatement = {
  print: ({ node, path, print }) => [
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
            ? [';', line]
            : ';'
      }
    ),
    ')',
    printBody(node, path, print)
  ]
};
