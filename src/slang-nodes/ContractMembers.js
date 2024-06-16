import { doc } from 'prettier';
import {
  printPreservingEmptyLines,
  printSeparatedItem
} from '../common/printer-helpers.js';

const { hardline } = doc.builders;

export const ContractMembers = {
  parse: ({ ast, options, parse }) => ({
    items: ast.items.map((item) => parse(item, options, parse))
  }),
  print: ({ node, options, path, print }) =>
    node.items.length > 0
      ? printSeparatedItem(
          printPreservingEmptyLines(path, 'items', options, print),
          { firstSeparator: hardline, grouped: false }
        )
      : ''
};
