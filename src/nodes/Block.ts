import { doc } from 'prettier';
import {
  printComments,
  printPreservingEmptyLines,
  printSeparatedItem
} from '../common/printer-helpers.js';
import type { Block as IBlock } from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from './types';

const { hardline } = doc.builders;

export const Block: NodePrinter<IBlock> = {
  print: ({ node, options, path, print }) =>
    // if block is empty, just return the pair of braces
    node.statements.length === 0 && !node.comments
      ? '{}'
      : [
          '{',
          printSeparatedItem(
            [
              printPreservingEmptyLines(path, 'statements', options, print),
              printComments(node, path, options)
            ],
            { firstSeparator: hardline, grouped: false }
          ),
          '}'
        ]
};
