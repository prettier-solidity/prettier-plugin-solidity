import { doc } from 'prettier';
import type { AssemblySwitch as IAssemblySwitch } from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from './types';

const { hardline, join } = doc.builders;

export const AssemblySwitch: NodePrinter<IAssemblySwitch> = {
  print: ({ path, print }) => [
    'switch ',
    path.call(print, 'expression'),
    hardline,
    join(hardline, path.map(print, 'cases'))
  ]
};
