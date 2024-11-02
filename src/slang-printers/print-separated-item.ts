import { doc } from 'prettier';

import type { Doc } from 'prettier';
import type { PrintSeparatedOptions } from './types.d.ts';

const { group, indent, softline } = doc.builders;

// This function will add an indentation to the `item` and separate it from the
// rest of the `doc` in most cases by a `softline`.
export function printSeparatedItem(
  item: Doc,
  {
    firstSeparator = softline,
    lastSeparator = firstSeparator,
    grouped = true
  }: PrintSeparatedOptions = {}
): Doc {
  return grouped
    ? group([indent([firstSeparator, item]), lastSeparator])
    : [indent([firstSeparator, item]), lastSeparator];
}
