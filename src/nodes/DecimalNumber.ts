import type { DecimalNumber as IDecimalNumber } from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from './types';

export const DecimalNumber: NodePrinter<IDecimalNumber> = {
  print: ({ node }) => node.value
};
