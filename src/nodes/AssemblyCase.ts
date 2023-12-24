import type { AssemblyCase as IAssemblyCase } from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from './types';

export const AssemblyCase: NodePrinter<IAssemblyCase> = {
  print: ({ node, path, print }) => [
    node.default ? 'default' : ['case ', path.call(print, 'value')],
    ' ',
    path.call(print, 'block')
  ]
};
