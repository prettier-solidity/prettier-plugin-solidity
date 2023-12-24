import type { Break as IBreak } from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from './types';

export const Break: NodePrinter<IBreak> = { print: () => 'break' };
