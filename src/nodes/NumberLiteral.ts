import type { NumberLiteral as INumberLiteral } from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from './types';

export const NumberLiteral: NodePrinter<INumberLiteral> = {
  print: ({ node }) =>
    node.subdenomination
      ? `${node.number} ${node.subdenomination}`
      : node.number
};
