import type { AssemblyMemberAccess as IAssemblyMemberAccess } from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from './types';

export const AssemblyMemberAccess: NodePrinter<IAssemblyMemberAccess> = {
  print: ({ path, print }) => [
    path.call(print, 'expression'),
    '.',
    path.call(print, 'memberName')
  ]
};
