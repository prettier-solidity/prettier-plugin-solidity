import type { BooleanLiteral as IBooleanLiteral } from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from './types';

export const BooleanLiteral: NodePrinter<IBooleanLiteral> = {
  print: ({ node }) => (node.value ? 'true' : 'false')
};
