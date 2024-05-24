import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers.js';

const { line } = doc.builders;

export const YulReturnVariables = {
  parse: ({ ast }) => ({
    kind: ast.cst.kind,
    items: ast.items.map((item) => item.text),
    separators: ast.separators.map((separator) => separator.text)
  }),
  print: ({ node }) =>
    printSeparatedList(node.items, {
      firstSeparator: line,
      lastSeparator: ''
    })
};
