import { doc } from 'prettier';
import { printSeparatedItem } from './print-separated-item.js';

import type { Doc } from 'prettier';
import type { PrintSeparatedOptions } from './types.d.ts';

const { join, line } = doc.builders;

// This function will add an indentation to the `list` and separate it from the
// rest of the `doc` in most cases by a `softline`.
// the list itself will be printed with a separator that in most cases is a
// comma (,) and a `line`
export function printSeparatedList(
  list: Doc[],
  {
    firstSeparator,
    separator = [',', line],
    lastSeparator,
    grouped
  }: PrintSeparatedOptions = {}
): Doc {
  return printSeparatedItem(join(separator, list), {
    firstSeparator,
    lastSeparator,
    grouped
  });
}
