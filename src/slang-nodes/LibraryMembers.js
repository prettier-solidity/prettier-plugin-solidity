import { doc } from 'prettier';
import {
  printPreservingEmptyLines,
  printSeparatedItem
} from '../common/printer-helpers.js';

const { hardline } = doc.builders;

export const LibraryMembers = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    items: ast.items.map((item) => parse(item, options, parse))
  }),
  print: ({ node, path, print, options }) =>
    node.items.length > 0
      ? printSeparatedItem(
          printPreservingEmptyLines(path, 'items', options, print),
          { firstSeparator: hardline, grouped: false }
        )
      : ''
};
