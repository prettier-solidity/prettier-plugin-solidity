import type { UserDefinedTypeName as IUserDefinedTypeName } from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from './types';

export const UserDefinedTypeName: NodePrinter<IUserDefinedTypeName> = {
  print: ({ node }) => node.namePath
};
