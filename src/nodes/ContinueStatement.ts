import type { ContinueStatement as IContinueStatement } from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from './types';

export const ContinueStatement: NodePrinter<IContinueStatement> = {
  print: () => 'continue;'
};
