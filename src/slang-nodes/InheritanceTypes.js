import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers.js';

const { line } = doc.builders;

export const InheritanceTypes = {
  parse: ({ offsets, ast, options, parse }) => ({
    items: ast.items.map((item) => parse(item, options, parse, offsets)),
    separators: ast.separators.map((separator) => separator.text)
  }),
  print: ({ path, print }) =>
    printSeparatedList(path.map(print, 'items'), {
      firstSeparator: line
    })
};
