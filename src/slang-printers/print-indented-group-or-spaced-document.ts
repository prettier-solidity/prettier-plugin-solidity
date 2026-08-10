import { group, indent, line } from './prettier-builders.js';

import type { Doc, doc } from 'prettier';

export function printIndentedGroupOrSpacedDocument(
  document: Doc,
  shouldGroup = true,
  groupOptions: doc.builders.GroupOptions = {}
): doc.builders.Group | [' ', Doc] {
  return shouldGroup
    ? group(indent([line, document]), groupOptions)
    : [' ', document];
}
