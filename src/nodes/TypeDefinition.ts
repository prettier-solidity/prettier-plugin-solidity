import type { TypeDefinition as ITypeDefinition } from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from './types';

export const TypeDefinition: NodePrinter<ITypeDefinition> = {
  print: ({ node }) => `type ${node.name} is ${node.definition.name};`
};
