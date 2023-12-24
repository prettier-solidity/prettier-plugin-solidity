import type { Continue as IContinue } from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from './types';

export const Continue: NodePrinter<IContinue> = { print: () => 'continue' };
