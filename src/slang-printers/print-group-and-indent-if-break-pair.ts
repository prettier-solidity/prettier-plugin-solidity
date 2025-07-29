import { doc } from 'prettier';

import type { Doc } from 'prettier';

const { group, indentIfBreak } = doc.builders;

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
