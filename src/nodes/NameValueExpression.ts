import type { NameValueExpression as INameValueExpression } from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from './types';

export const NameValueExpression: NodePrinter<INameValueExpression> = {
  print: ({ path, print }) => [
    path.call(print, 'expression'),
    '{',
    path.call(print, 'arguments'),
    '}'
  ]
};
