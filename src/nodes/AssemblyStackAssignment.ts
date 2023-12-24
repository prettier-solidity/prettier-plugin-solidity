import type { AssemblyStackAssignment as IAssemblyStackAssignment } from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from './types';

export const AssemblyStackAssignment: NodePrinter<IAssemblyStackAssignment> = {
  print: ({ node, path, print }) => [
    path.call(print, 'expression'),
    ` =: ${node.name}`
  ]
};
