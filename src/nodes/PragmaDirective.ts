import type { PragmaDirective as IPragmaDirective } from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from './types';

export const PragmaDirective: NodePrinter<IPragmaDirective> = {
  print: ({ node }) => `pragma ${node.name} ${node.value};`
};
