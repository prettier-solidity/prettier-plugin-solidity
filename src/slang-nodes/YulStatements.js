import {
  printComments,
  printPreservingEmptyLines
} from '../common/slang-helpers.js';

export const YulStatements = {
  parse: ({ offsets, ast, options, parse }) => ({
    items: ast.items.map((item) => parse(item, options, parse, offsets))
  }),
  print: ({ node, path, print, options }) =>
    node.items.length > 0
      ? printPreservingEmptyLines(path, 'items', options, print)
      : printComments(node, path, options)
};
