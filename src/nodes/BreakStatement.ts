import type { BreakStatement as IBreakStatement } from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from './types';

export const BreakStatement: NodePrinter<IBreakStatement> = {
  print: () => 'break;'
};
