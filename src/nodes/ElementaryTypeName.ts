import type { ElementaryTypeName as IElementaryTypeName } from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from './types';

const stateMutability = (node: IElementaryTypeName): string =>
  node.stateMutability ? ` ${node.stateMutability}` : '';

export const ElementaryTypeName: NodePrinter<IElementaryTypeName> = {
  print: ({ node }) => `${node.name}${stateMutability(node)}`
};
