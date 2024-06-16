import { printSeparatedList } from '../common/printer-helpers.js';

export const YulParameters = {
  parse: ({ ast }) => ({
    items: ast.items.map((item) => item.text),
    separators: ast.separators.map((separator) => separator.text)
  }),
  print: ({ node }) => printSeparatedList(node.items)
};
