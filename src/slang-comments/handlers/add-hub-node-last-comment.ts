import { util } from 'prettier';

import type { HubNode } from '../../slang-nodes';
import type { Comment } from '../../types';

const { addDanglingComment, addTrailingComment } = util;

export default function addHubNodeLastComment(
  node: HubNode,
  comment: Comment
): void {
  if (node.items.length === 0) {
    addDanglingComment(node, comment, false);
  } else {
    addTrailingComment(node.items[node.items.length - 1], comment);
  }
}
