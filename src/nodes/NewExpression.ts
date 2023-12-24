import type { NewExpression as INewExpression } from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from './types';

export const NewExpression: NodePrinter<INewExpression> = {
  print: ({ path, print }) => ['new ', path.call(print, 'typeName')]
};
