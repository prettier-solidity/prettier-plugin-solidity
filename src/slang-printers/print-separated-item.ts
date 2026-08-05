import { group, hardline, indent, softline } from './prettier-builders.js';

import type { Doc, doc } from 'prettier';
import type { PrintSeparatedOptions } from './types.d.ts';

// This function will add an indentation to the `item` and separate it from the
// rest of the `doc` in most cases by a `softline`.
export function printSeparatedItem(
  item: Doc,
  {
    firstSeparator = softline,
    lastSeparator = firstSeparator,
    grouped = firstSeparator !== hardline
  }: PrintSeparatedOptions = {}
): doc.builders.Group | [doc.builders.Indent, Doc] {
  const document: [doc.builders.Indent, Doc] = [
    indent([firstSeparator, item]),
    lastSeparator
  ];
  return grouped ? group(document) : document;
}
