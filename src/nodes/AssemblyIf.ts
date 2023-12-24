import type { AssemblyIf as IAssemblyIf } from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from './types';

export const AssemblyIf: NodePrinter<IAssemblyIf> = {
  print: ({ path, print }) => [
    'if ',
    path.call(print, 'condition'),
    ' ',
    path.call(print, 'body')
  ]
};
