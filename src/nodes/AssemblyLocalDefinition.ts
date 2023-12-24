import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers.js';
import type { AssemblyLocalDefinition as IAssemblyLocalDefinition } from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from './types';

const { line } = doc.builders;

export const AssemblyLocalDefinition: NodePrinter<IAssemblyLocalDefinition> = {
  print: ({ node, path, print }) => [
    'let',
    printSeparatedList(path.map(print, 'names'), { firstSeparator: line }),
    node.expression ? [':= ', path.call(print, 'expression')] : ''
  ]
};
