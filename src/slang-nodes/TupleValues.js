import { printSeparatedList } from '../common/printer-helpers.js';
import { isBinaryOperation } from '../common/slang-helpers.js';

export const TupleValues = {
  parse: ({ offsets, ast, options, parse }) => ({
    items: ast.items.map((item) => parse(item, options, parse, offsets)),
    separators: ast.separators.map((separator) => separator.text)
  }),
  print: ({ node, path, print }) =>
    node.items.length === 1 &&
    isBinaryOperation(node.items[0].expression.variant)
      ? path.map(print, 'items')
      : printSeparatedList(path.map(print, 'items'))
};
