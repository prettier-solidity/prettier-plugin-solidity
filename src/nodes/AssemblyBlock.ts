import { doc } from 'prettier';
import {
  printComments,
  printPreservingEmptyLines,
  printSeparatedItem
} from '../common/printer-helpers.js';
import type { AssemblyBlock as IAssemblyBlock } from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from './types';

const { hardline } = doc.builders;

export const AssemblyBlock: NodePrinter<IAssemblyBlock> = {
  print: ({ node, path, print, options }) => [
    '{',
    printSeparatedItem(
      [
        printPreservingEmptyLines(path, 'operations', options, print),
        printComments(node, path, options)
      ],
      { firstSeparator: hardline, grouped: false }
    ),
    '}'
  ]
};
