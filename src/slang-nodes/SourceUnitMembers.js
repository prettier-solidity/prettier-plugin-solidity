import { printPreservingEmptyLines } from '../common/slang-helpers.js';

export const SourceUnitMembers = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    items: ast.items.map((item) => parse(item, options, parse, offsets))
  }),
  print: ({ path, options, print }) =>
    printPreservingEmptyLines(path, 'items', options, print)
};
