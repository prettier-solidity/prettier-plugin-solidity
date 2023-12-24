import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers.js';
import type { ForStatement as IForStatement } from '@solidity-parser/parser/src/ast-types';
import type { AstPath, Doc } from 'prettier';
import type { NodePrinter } from './types';

const { group, indent, line } = doc.builders;

const printBody = (
  node: IForStatement,
  path: AstPath,
  print: (path: AstPath) => Doc
): Doc =>
  node.body.type === 'Block'
    ? [' ', path.call(print, 'body')]
    : group(indent([line, path.call(print, 'body')]));

export const ForStatement: NodePrinter<IForStatement> = {
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
