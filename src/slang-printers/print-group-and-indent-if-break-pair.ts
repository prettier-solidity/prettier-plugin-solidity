import { group, indentIfBreak } from './prettier-builders.js';

import type { Doc, doc } from 'prettier';

export function printGroupAndIndentIfBreakPair(
  groupDoc: Doc,
  indentIfBreakDoc: Doc
): [doc.builders.Group, doc.builders.IndentIfBreak] {
  const groupId = Symbol('Slang.GroupAndIndentIfBreakPair');
  return [
    group(groupDoc, { id: groupId }),
    indentIfBreak(indentIfBreakDoc, { groupId })
  ];
}
