import { doc } from 'prettier';

import type { Doc } from 'prettier';

const { group, indent, line } = doc.builders;

export function printIndentedGroupOrSpacedDocument(
  document: Doc,
  shouldGroup = true,
  groupOptions: doc.builders.GroupOptions = {}
): doc.builders.Group | [' ', Doc] {
  return shouldGroup
    ? group(indent([line, document]), groupOptions)
    : [' ', document];
}
