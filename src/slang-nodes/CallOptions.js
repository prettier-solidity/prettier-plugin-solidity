import { printSeparatedList } from '../common/printer-helpers.js';

export const CallOptions = {
  parse: ({ ast, options, parse }) => ({
    items: ast.items.map((item) => parse(item, options, parse)),
    separators: ast.separators.map((separator) => separator.text)
  }),
  print: ({ path, print }) => printSeparatedList(path.map(print, 'items'))
};
