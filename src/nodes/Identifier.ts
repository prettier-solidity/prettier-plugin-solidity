import type { Identifier as IIdentifier } from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from './types';

export const Identifier: NodePrinter<IIdentifier> = {
  print: ({ node }) => node.name
};
