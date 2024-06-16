import { printPreservingEmptyLines } from '../common/printer-helpers.js';

export const SourceUnitMembers = {
  parse: ({ ast, options, parse }) => ({
    items: ast.items.map((item) => parse(item, options, parse))
  }),
  print: ({ path, options, print }) =>
    printPreservingEmptyLines(path, 'items', options, print)
};
