import { doc } from 'prettier';

import type { Doc } from 'prettier';

const { group, indent, line } = doc.builders;

export function printSpacedOrIndentedGroup(
  document: Doc,
  spaceCondition: boolean,
  groupOptions: doc.builders.GroupOptions = {}
): Doc {
  return spaceCondition
    ? [' ', document]
    : group(indent([line, document]), groupOptions);
}
