import {
  addDanglingComment,
  addLeadingComment
} from '../../slang-utils/prettier-utils.js';

import type { Comment, StrictCollection } from '../../slang-nodes/types.d.ts';

export default function addCollectionFirstComment(
  node: StrictCollection,
  comment: Comment
): void {
  if (node.items.length === 0) {
    addDanglingComment(node, comment, false);
  } else {
    addLeadingComment(node.items[0], comment);
  }
}
