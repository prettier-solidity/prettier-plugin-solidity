import { printSeparatedList } from '../common/printer-helpers.js';

export const NamedArguments = {
  parse: ({ offsets, ast, options, parse }) => ({
    items: ast.items.map((item) => parse(item, options, parse, offsets)),
    separators: ast.separators.map((separator) => separator.text)
  }),
  print: ({ path, print }) => printSeparatedList(path.map(print, 'items'))
};
