import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers.js';

const { hardline } = doc.builders;

export const EnumMembers = {
  parse: ({ ast }) => ({
    kind: ast.cst.kind,
    items: ast.items.map((item) => item.text),
    separators: ast.separators.map((separator) => separator.text)
  }),
  print: ({ node }) =>
    printSeparatedList(node.items, {
      firstSeparator: hardline
    })
};
