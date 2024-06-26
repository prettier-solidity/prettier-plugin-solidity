import { printPreservingEmptyLines } from '../common/slang-helpers.js';

export const SourceUnitMembers = {
  parse: ({ offsets, ast, options, parse }) => ({
    items: ast.items.map((item) => parse(item, options, parse, offsets))
  }),
  print: ({ path, options, print }) =>
    printPreservingEmptyLines(path, 'items', options, print)
};
