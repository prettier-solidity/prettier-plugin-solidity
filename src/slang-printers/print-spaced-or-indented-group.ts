import { doc } from 'prettier';

import type { Doc } from 'prettier';

const { group, indent, line } = doc.builders;

export function printSpacedOrIndentedGroup(
  document: Doc,
  sameLineCondition: boolean,
  groupOptions: doc.builders.GroupOptions = {}
): [' ', Doc] | doc.builders.Group {
  return sameLineCondition
    ? [' ', document]
    : group(indent([line, document]), groupOptions);
}
