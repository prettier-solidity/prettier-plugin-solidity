import { util } from 'prettier';

import type { HubNode } from '../../slang-nodes';
import type { Comment } from '../../types';

const { addDanglingComment, addLeadingComment } = util;

export default function addHubNodeFirstComment(
  node: HubNode,
  comment: Comment
): void {
  if (node.items.length === 0) {
    addDanglingComment(node, comment, false);
  } else {
    addLeadingComment(node.items[0], comment);
  }
}
