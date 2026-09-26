import {
  getPreferredQuote,
  makeString
} from '../slang-utils/prettier-utils.js';

import type { ParserOptions } from 'prettier';
import type { PrintableNode } from '../slang-nodes/types.d.ts';

export function printString(
  rawContent: string,
  options: ParserOptions<PrintableNode>
): string {
  // It might sound unnecessary to use `makeString` even if the string already
  // is enclosed with `enclosingQuote`, but it isn't. The string could contain
  // unnecessary escapes (such as in `"\'"`). Always using `makeString` makes
  // sure that we consistently output the minimum amount of escaped quotes.
  return makeString(
    rawContent,
    getPreferredQuote(rawContent, options.singleQuote)
  );
}
