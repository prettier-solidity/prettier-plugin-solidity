import type { ThrowStatement as IThrowStatement } from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from './types';

export const ThrowStatement: NodePrinter<IThrowStatement> = {
  print: () => 'throw;'
};
