import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers.js';

const { hardline } = doc.builders;

export const StructMembers = {
  parse: ({ offsets, ast, options, parse }) => ({
    items: ast.items.map((item) => parse(item, options, parse, offsets))
  }),
  print: ({ node, path, print }) =>
    node.items.length > 0
      ? printSeparatedList(path.map(print, 'items'), {
          firstSeparator: hardline,
          separator: hardline
        })
      : ''
};
