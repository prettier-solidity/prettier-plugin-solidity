import { doc } from 'prettier';
import { sortFunctionAttributes } from '../common/slang-helpers.js';

const { line } = doc.builders;

export const FallbackFunctionAttributes = {
  parse: ({ offsets, ast, options, parse }) => ({
    items: ast.items
      .map((item) => parse(item, options, parse, offsets))
      .sort(sortFunctionAttributes)
  }),
  print: ({ path, print }) =>
    path.map(print, 'items').map((item) => [line, item])
};
