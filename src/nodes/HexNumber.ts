import type { HexNumber as IHexNumber } from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from './types';

export const HexNumber: NodePrinter<IHexNumber> = {
  print: ({ node }) => node.value
};
