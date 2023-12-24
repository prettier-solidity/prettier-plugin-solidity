import { doc } from 'prettier';
import type { AssemblyAssignment as IAssemblyAssignment } from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from './types';

const { join } = doc.builders;

export const AssemblyAssignment: NodePrinter<IAssemblyAssignment> = {
  print: ({ path, print }) => [
    join(', ', path.map(print, 'names')),
    ' := ',
    path.call(print, 'expression')
  ]
};
