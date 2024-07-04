import { doc } from 'prettier';
import { printSeparatedItem } from '../common/printer-helpers.js';
import {
  printComments,
  printPreservingEmptyLines
} from '../common/slang-helpers.js';

const { hardline } = doc.builders;

export const Statements = {
  parse: ({ offsets, ast, options, parse }) => ({
    items: ast.items.map((item) => parse(item, options, parse, offsets))
  }),
  print: ({ node, path, options, print }) =>
    node.items.length === 0 && (!node.comments || node.comments.length === 0)
      ? ''
      : printSeparatedItem(
          [
            printPreservingEmptyLines(path, 'items', options, print),
            printComments(node, path, options)
          ],
          {
            firstSeparator: hardline,
            grouped: false
          }
        )
};
