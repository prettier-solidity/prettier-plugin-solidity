import type { UncheckedStatement as IUncheckedStatement } from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from './types';

export const UncheckedStatement: NodePrinter<IUncheckedStatement> = {
  print: ({ path, print }) => ['unchecked ', path.call(print, 'block')]
};
