import { doc } from 'prettier';
import { printSeparatedItem } from '../common/printer-helpers.js';
import { printPreservingEmptyLines } from '../common/slang-helpers.js';

const { hardline } = doc.builders;

export const InterfaceMembers = {
  parse: ({ offsets, ast, options, parse }) => ({
    items: ast.items.map((item) => parse(item, options, parse, offsets))
  }),
  print: ({ node, options, path, print }) =>
    node.items.length > 0
      ? printSeparatedItem(
          printPreservingEmptyLines(path, 'items', options, print),
          { firstSeparator: hardline, grouped: false }
        )
      : ''
};
