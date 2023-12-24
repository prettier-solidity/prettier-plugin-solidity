import type { RevertStatement as IRevertStatement } from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from './types';

export const RevertStatement: NodePrinter<IRevertStatement> = {
  print: ({ path, print }) => ['revert ', path.call(print, 'revertCall'), ';']
};
