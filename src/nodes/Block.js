import { doc } from 'prettier';
import {
  printComments,
  printPreservingEmptyLines,
  printSeparatedItem
} from '../common/printer-helpers.js';

const { hardline } = doc.builders;

export const Block = {
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
