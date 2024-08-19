import { util } from 'prettier';

import type { Comment, HubNode } from '../../slang-nodes';

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
