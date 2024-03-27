import type { UnaryOperation as IUnaryOperation } from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from './types';

export const UnaryOperation: NodePrinter<IUnaryOperation> = {
  print: ({ node, path, print }) =>
    node.isPrefix
      ? [
          node.operator,
          node.operator === 'delete' ? ' ' : '',
          path.call(print, 'subExpression')
        ]
      : [path.call(print, 'subExpression'), node.operator]
};
