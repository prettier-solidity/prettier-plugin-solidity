import { util } from 'prettier';

import type { HandlerParams } from './types';

const { addDanglingComment, addLeadingComment, addTrailingComment } = util;

export default function handleBlockComments({
  precedingNode,
  enclosingNode,
  followingNode,
  comment
}: HandlerParams): boolean {
  if (enclosingNode?.kind !== 'ParametersDeclaration') {
    return false;
  }

  if (precedingNode?.kind === 'Parameters') {
    if (precedingNode.items.length === 0) {
      addDanglingComment(precedingNode, comment, false);
    } else {
      addTrailingComment(
        precedingNode.items[precedingNode.items.length - 1],
        comment
      );
    }
    return true;
  }

  if (followingNode?.kind === 'Parameters') {
    if (followingNode.items.length === 0) {
      addDanglingComment(followingNode, comment, false);
    } else {
      addLeadingComment(followingNode.items[0], comment);
    }
    return true;
  }

  return false;
}
