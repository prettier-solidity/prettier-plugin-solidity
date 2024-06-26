import { printSeparatedList } from '../common/printer-helpers.js';

export const Parameters = {
  parse: ({ offsets, ast, options, parse }) => ({
    items: ast.items.map((item) => parse(item, options, parse, offsets)),
    separators: ast.separators.map((separator) => separator.text)
  }),
  print: ({ node, path, print }) =>
    node.items.length > 0
      ? printSeparatedList(path.map(print, 'items'), { grouped: false })
      : ''
};
