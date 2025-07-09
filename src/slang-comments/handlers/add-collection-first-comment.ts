import { util } from 'prettier';

import type { Comment, Collection } from '../../slang-nodes/types.d.ts';

const { addDanglingComment, addLeadingComment } = util;

export default function addCollectionFirstComment(
  node: Collection,
  comment: Comment
): void {
  if (node.items.length === 0) {
    addDanglingComment(node, comment, false);
  } else {
    addLeadingComment(node.items[0], comment);
  }
}
