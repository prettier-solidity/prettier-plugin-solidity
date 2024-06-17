import { printSeparatedList } from '../common/printer-helpers.js';

export const EventParameters = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    items: ast.items.map((item) => parse(item, options, parse, offsets)),
    separators: ast.separators.map((separator) => separator.text)
  }),
  print: ({ node, path, print }) =>
    node.items.length > 0 ? printSeparatedList(path.map(print, 'items')) : ''
};
