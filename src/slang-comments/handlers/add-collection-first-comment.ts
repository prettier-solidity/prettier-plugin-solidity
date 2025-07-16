import { util } from 'prettier';

import type { Comment, NodeCollection } from '../../slang-nodes/types.d.ts';

const { addDanglingComment, addLeadingComment } = util;

export default function addCollectionFirstComment(
  node: NodeCollection,
  comment: Comment
): void {
  if (node.items.length === 0) {
    addDanglingComment(node, comment, false);
  } else {
    addLeadingComment(node.items[0], comment);
  }
}
