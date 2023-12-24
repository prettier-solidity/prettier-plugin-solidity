import type { EnumValue as IEnumValue } from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from './types';

export const EnumValue: NodePrinter<IEnumValue> = {
  print: ({ node }) => node.name
};
