import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers.ts';

const { group, indent, line } = doc.builders;

const printBody = (node, path, print) =>
  node.body.type === 'Block'
    ? [' ', path.call(print, 'body')]
    : group(indent([line, path.call(print, 'body')]));

export const ForStatement = {
  print: ({ node, path, print }) => [
    'for (',
    printSeparatedList(
      ['initExpression', 'conditionExpression', 'loopExpression'].map(
        (expression) => path.call(print, expression)
      ),
      {
        separator:
          node.initExpression ??
          node.conditionExpression ??
          node.loopExpression.expression
            ? [';', line]
            : ';'
      }
    ),
    ')',
    printBody(node, path, print)
  ]
};
